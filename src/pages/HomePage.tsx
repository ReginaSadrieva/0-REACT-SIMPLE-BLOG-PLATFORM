// ------------------------------------------------------------------
// Purpose: The main landing page of the blog (Global Feed).
//          This is the page shown at "/" and "/articles".
//
// Why it's a separate page component:
//   • Clear separation between routing and UI
//   • Easy to add new sections (banner, tags, article list) without clutter
//   • Will be reused for "/articles" route
//
// Structure:
//   • <Banner /> – full-width hero section (outside Container)
//   • <Container> – all other content with 240px side padding
//     → PopularTags (left sidebar)
//     → ArticleList (main column with cards + pagination)
// ------------------------------------------------------------------

import Banner from '../components/banner/Banner';
import Container from '../components/common/Container';
import PopularTags from '../components/tags/PopularTags';
import ArticleList from '../components/article/ArticleList';

export default function HomePage() {
  return (
    <>
      {/* Full-width green hero banner – only on home page */}
      <Banner />

      {/* All content below the banner respects the 1280px container with 240px side padding */}
      <Container>
        {/* Left sidebar with popular tags */}
        <PopularTags />

        {/* Main content: article cards + server-side pagination */}
        <ArticleList />
      </Container>
    </>
  );
}
