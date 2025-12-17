// ------------------------------------------------------------------
// Purpose: Custom hook to access the authentication context.
//          Exported separately to satisfy ESLint react-refresh rule.
//
// How it works:
//   • Uses useContext to get AuthContext value
//   • Throws error if used outside AuthProvider
// ------------------------------------------------------------------

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export { AuthContext };
