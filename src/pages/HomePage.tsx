import Banner from '../components/banner/Banner';
import Container from '../components/common/Container';

export default function HomePage() {
  return (
    <>
      <Banner /> {/* на всю ширину */}
      <Container>
        {' '}
        {/* только статьи и теги */}
        <div
          style={{
            minHeight: '1000px',
            background: '#f8f9fa',
            padding: '40px',
          }}
        >
          <h2>Статьи и теги будут здесь</h2>
        </div>
      </Container>
    </>
  );
}
