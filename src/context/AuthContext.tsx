// ------------------------------------------------------------------
// Purpose: Global authentication context for the entire application.
//          Manages user state, authentication token, login/logout functionality,
//          and persistence across page reloads.
//
// Why it's a separate context:
//   • Centralized auth logic – used in Header, protected routes, forms
//   • Avoids prop drilling – any component can access user/token
//   • Enables persistence (localStorage) and automatic login on reload
//   • Clean separation from UI components (follows React best practices)
//
// How it works:
//   • Provides: user (null or User object), token, isAuthenticated
//   • login() – saves token + user to state and localStorage
//   • logout() – clears state and localStorage
//   • On mount, restores session from localStorage (using useReducer to avoid ESLint warning)
//   • Used via useAuth() hook in components
// ------------------------------------------------------------------

import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

type AuthAction =
  | { type: 'RESTORE_TOKEN'; payload: { token: string; user: User } }
  | { type: 'LOGIN'; payload: { token: string; user: User } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider – wraps the entire app (in main.tsx)
 * Provides auth state to all child components.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch({
          type: 'RESTORE_TOKEN',
          payload: { token: storedToken, user: parsedUser },
        });
      } catch {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    dispatch({ type: 'LOGIN', payload: { token: newToken, user: newUser } });
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('authUser', JSON.stringify(newUser));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: !!state.token && !!state.user,
    login,
    logout,
    loading: state.loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext };
