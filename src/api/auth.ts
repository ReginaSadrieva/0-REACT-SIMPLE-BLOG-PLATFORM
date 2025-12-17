// ------------------------------------------------------------------
// Purpose: API service for authentication-related endpoints.
//          Handles registration, login, getting current user, and updating user profile.
//
// Why separate from articles.ts:
//   • Clear separation – auth and articles have different endpoints and logic
//   • Easy to extend (e.g. password reset, email verification in future)
//   • Reusable across SignUp, SignIn, Profile pages
//
// How it works:
//   • Uses axios for HTTP requests
//   • Base URL from the RealWorld API
//   • All functions return typed data or throw errors for UI handling
//   • Token is added to headers automatically for authenticated requests
// ------------------------------------------------------------------

import axios from 'axios';
import type { User } from '../types/user';

const API_URL = 'https://realworld.habsida.net/api';

/**
 * Registration (Sign Up)
 * POST /users
 */
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${API_URL}/users`, {
    user: userData,
  });
  return response.data;
};

/**
 * Login (Sign In)
 * POST /users/login
 */
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${API_URL}/users/login`, {
    user: credentials,
  });
  return response.data;
};

/**
 * Get current authenticated user
 * GET /user
 * Requires Authorization header with token
 */
export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data.user;
};

/**
 * Update user profile
 * PUT /user
 * Requires Authorization header with token
 */
export const updateUser = async (
  token: string,
  userData: Partial<{
    username: string;
    email: string;
    password: string;
    bio: string;
    image: string;
  }>
): Promise<User> => {
  const response = await axios.put(
    `${API_URL}/user`,
    { user: userData },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.user;
};
