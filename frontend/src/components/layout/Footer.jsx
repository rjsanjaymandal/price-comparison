import { Layout, Row, Col, Typography, Space, Divider, Input, Button } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  YoutubeOutlined,
  SendOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <div className="footer-container">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={4}>PriceCompare</Title>
            <Paragraph>
              Find the best prices on your favorite products across multiple e-commerce platforms.
              Compare prices, read reviews, and make informed purchasing decisions.
            </Paragraph>
            <Space>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined className="social-icon" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <YoutubeOutlined className="social-icon" />
              </a>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={4}>Quick Links</Title>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={4}>Product Categories</Title>
            <ul className="footer-links">
              <li><Link to="/category/mobiles">Mobiles</Link></li>
              <li><Link to="/category/laptops">Laptops</Link></li>
              <li><Link to="/category/cameras">Cameras</Link></li>
              <li><Link to="/category/tvs">TVs</Link></li>
              <li><Link to="/category/audio">Audio</Link></li>
              <li><Link to="/category/wearables">Wearables</Link></li>
            </ul>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={4}>Subscribe to Newsletter</Title>
            <Paragraph>
              Get the latest deals and product updates delivered directly to your inbox.
            </Paragraph>
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder="Your email address" />
              <Button type="primary" icon={<SendOutlined />}>Subscribe</Button>
            </Space.Compact>
          </Col>
        </Row>
        
        <Divider />
        
        <Row>
          <Col xs={24} md={12}>
            <Text>&copy; {new Date().getFullYear()} PriceCompare. All rights reserved.</Text>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Space split={<Divider type="vertical" />}>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;
