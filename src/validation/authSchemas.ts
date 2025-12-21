// ------------------------------------------------------------------
// Purpose: Zod validation schemas for Sign Up and Sign In forms.
//
// Requirements (Phase 2):
//   • Sign Up: all fields required, email valid, username 3-20 chars, password 6-40 chars, passwords match, checkbox checked
//   • Sign In: email valid and not empty, password not empty
// ------------------------------------------------------------------

import { z } from 'zod';

/**
 * Sign Up form validation schema
 */
export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must be at most 40 characters'),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords must match',
    path: ['repeatPassword'],
  });

/**
 * Sign In form validation schema
 */
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

/**
 * User Settings form validation schema
 */
export const settingsSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(40)
    .optional()
    .or(z.literal('')),
  bio: z.string().optional(),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
