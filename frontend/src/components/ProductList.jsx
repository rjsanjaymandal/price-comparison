import { Row, Col, Empty, Typography, Spin } from 'antd';
import ProductCard from './ProductCard';

const { Title, Text } = Typography;

const ProductList = ({ products, isLoading, error, query }) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Text style={{ marginTop: 16 }}>Searching for the best prices...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <Empty
        description={
          <span>
            Error: {error}
          </span>
        }
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        description={
          <span>
            {query ? `No products found for "${query}"` : 'Search for a product to compare prices'}
          </span>
        }
      />
    );
  }

  // Sort products by price (lowest first)
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  // Group products by store
  const amazonProducts = sortedProducts.filter(product => product.store === 'Amazon');
  const flipkartProducts = sortedProducts.filter(product => product.store === 'Flipkart');

  return (
    <div className="product-list">
      <Title level={3}>Price Comparison Results for "{query}"</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Title level={4} style={{ color: '#2874F0' }}>Flipkart</Title>
          {flipkartProducts.length > 0 ? (
            flipkartProducts.map((product, index) => (
              <ProductCard key={`flipkart-${index}`} product={product} />
            ))
          ) : (
            <Empty description="No products found on Flipkart" />
          )}
        </Col>
        
        <Col xs={24} sm={24} md={12}>
          <Title level={4} style={{ color: '#FF9900' }}>Amazon</Title>
          {amazonProducts.length > 0 ? (
            amazonProducts.map((product, index) => (
              <ProductCard key={`amazon-${index}`} product={product} />
            ))
          ) : (
            <Empty description="No products found on Amazon" />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
