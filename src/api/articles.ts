// ------------------------------------------------------------------
// Purpose: Centralised API service for fetching articles from the RealWorld backend
// Why here: All API-related logic is isolated in one place → easy to maintain,
// test, mock, or replace with another backend in the future.
// How it works:
//   • Uses axios for HTTP requests
//   • Implements server-side pagination (limit + offset)
//   • Handles 429 Too Many Requests by automatically waiting ~1 minute and retrying
//   • Returns typed data (no 'any' anywhere)
// ------------------------------------------------------------------

import axios from 'axios';

/**
 * Base URL for the RealWorld API used in this project.
 * All requests are made relative to this URL.
 */
const API_URL = 'https://realworld.habsida.net/api';

/**
 * Shape of a single article as returned by the API.
 * This interface is reused across the whole application.
 */
export interface Article {
  slug: string; // unique identifier used in URLs (e.g. /articles/how-to-train-your-dragon)
  title: string;
  description: string;
  body: string; // full markdown content (used on the article detail page)
  tagList: string[]; // array of tags
  createdAt: string; // ISO date string
  favoritesCount: number; // number of likes
  author: {
    username: string;
    image: string; // URL to the author's avatar
  };
}

/**
 * Shape of the API response when requesting a list of articles.
 */
interface ApiResponse {
  articles: Article[];
  articlesCount: number; // total number of articles (needed for pagination)
}

/**
 * Fetches a page of articles from the server.
 *
 * @param page  – current page (default = 1)
 * @param limit – number of articles per page (default = 10, matches the RealWorld API)
 * @returns     – object with articles array and total count
 *
 * Features:
 *   • Fully typed request/response
 *   • Server-side pagination via `offset` and `limit`
 *   • Automatic retry on 429 (rate-limit) after ~60 seconds
 */
export const fetchArticles = async (
  page: number = 1,
  limit: number = 10,
  filters?: { author?: string }
): Promise<{ articles: Article[]; articlesCount: number }> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_URL}/articles`, {
      params: {
        limit,
        offset: (page - 1) * limit, // calculate offset for the requested page
        ...filters,
      },
    });

    // Successful response → return data in the shape we need
    return {
      articles: response.data.articles,
      articlesCount: response.data.articlesCount,
    };
  } catch (error: unknown) {
    // Handle rate limiting (429) – the RealWorld API returns this when too many requests
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      // Wait approximately 1 minute and then retry the same request
      await new Promise((resolve) => setTimeout(resolve, 61000));
      return fetchArticles(page, limit); // recursive retry
    }

    // Any other error – re-throw so the UI can show an error state
    throw error;
  }
};
