// ------------------------------------------------------------------
// Purpose: Zod validation schemas for article creation/editing.
// ------------------------------------------------------------------

import { z } from 'zod';

/**
 * Article form validation schema
 */
export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  body: z.string().min(1, 'Body is required'),
  tagList: z.string().optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
