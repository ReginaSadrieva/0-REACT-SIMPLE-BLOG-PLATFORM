import Banner from '../components/banner/Banner';
import Container from '../components/common/Container';
import PopularTags from '../components/tags/PopularTags';
import ArticleList from '../components/article/ArticleList';

export default function HomePage() {
  return (
    <>
      <Banner /> {/* on whole width */}
      <Container>
        <PopularTags />
        <ArticleList />
      </Container>
    </>
  );
}
