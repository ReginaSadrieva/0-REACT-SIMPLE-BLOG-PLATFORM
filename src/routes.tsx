import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';

const router = createBrowserRouter(
  [
    {
      element: <Layout />, // Layout — общий для всех
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/articles', element: <HomePage /> },
        { path: '/articles/:slug', element: <ArticlePage /> },
      ],
    },
  ],
  {
    basename: '/0-REACT-SIMPLE-BLOG-PLATFORM',
  }
);

export default function Routes() {
  return <RouterProvider router={router} />;
}
