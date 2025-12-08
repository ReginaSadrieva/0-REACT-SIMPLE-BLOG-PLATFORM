import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';

// Эта строчка — ключ к жизни на GitHub Pages и localhost с префиксом
//const router знает, что все пути начинаются с /0-REACT-SIMPLE-BLOG-PLATFORM/
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'articles', element: <HomePage /> },
        { path: 'articles/:slug', element: <ArticlePage /> },
      ],
    },
  ],
  {
    basename: '/0-REACT-SIMPLE-BLOG-PLATFORM', // ← ЭТО РЕШАЕТ ВСЁ
  }
);

export default function Routes() {
  return <RouterProvider router={router} />;
}
