import { Typography } from 'antd';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PopularBrands from '../components/home/PopularBrands';

const { Title } = Typography;

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroBanner />
      
      <div className="container">
        <CategorySection />
        <FeaturedProducts />
        <PopularBrands />
        
        <div className="about-section section">
          <Title level={2} className="section-title">About PriceCompare</Title>
          <Typography.Paragraph>
            PriceCompare is your one-stop destination for comparing prices across multiple e-commerce platforms in India. 
            We help you find the best deals on your favorite products from Amazon, Flipkart, Croma, Reliance Digital, and more.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Our advanced price comparison engine fetches real-time prices and offers from various online stores, 
            allowing you to make informed purchasing decisions. Save time and money by comparing prices, 
            reading reviews, and tracking price drops all in one place.
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
