import Banner from '../components/banner/Banner';
import Container from '../components/common/Container';
import PopularTags from '../components/tags/PopularTags';
import ArticleCard from '../components/article/ArticleCard';

export default function HomePage() {
  return (
    <>
      <Banner /> {/* on whole width */}
      <Container>
        <PopularTags />
        <ArticleCard />
      </Container>
    </>
  );
}
