import Banner from '../components/banner/Banner';
import Container from '../components/common/Container';
import PopularTags from '../components/tags/PopularTags';

export default function HomePage() {
  return (
    <>
      <Banner /> {/* on whole width */}
      <Container>
        <PopularTags />
        {/* then to be added here ArticleList + Pagination */}
        <div style={{ height: '1000px' }}></div>
      </Container>
    </>
  );
}
