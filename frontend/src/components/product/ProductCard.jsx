import { Card, Typography, Rate, Tag, Space, Tooltip } from 'antd';
import { HeartOutlined, BellOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const ProductCard = ({ product }) => {
  const { 
    name, 
    slug, 
    brand, 
    category, 
    images, 
    lowestPrice, 
    highestPrice, 
    averageRating, 
    reviewCount,
    stores = []
  } = product;

  // Format price with commas for Indian Rupee format
  const formattedLowestPrice = lowestPrice.toLocaleString('en-IN');
  const formattedHighestPrice = highestPrice.toLocaleString('en-IN');

  const actions = [
    <Tooltip title="Add to Wishlist">
      <HeartOutlined key="wishlist" />
    </Tooltip>,
    <Tooltip title="Set Price Alert">
      <BellOutlined key="alert" />
    </Tooltip>,
    <Tooltip title="Compare Prices">
      <ShoppingOutlined key="compare" />
    </Tooltip>
  ];

  return (
    <Card
      hoverable
      cover={
        <Link to={`/product/${slug}`}>
          <div className="product-image-container">
            <img 
              alt={name} 
              src={images[0]} 
              className="product-image"
            />
          </div>
        </Link>
      }
      actions={actions}
      className="product-card"
    >
      <Link to={`/product/${slug}`}>
        <Meta
          title={
            <Tooltip title={name}>
              <div className="product-title">{name}</div>
            </Tooltip>
          }
          description={
            <Space direction="vertical" size={2} style={{ width: '100%' }}>
              <div className="product-brand-category">
                <Text type="secondary">{brand} | {category}</Text>
              </div>
              
              <div className="product-rating">
                <Rate disabled defaultValue={averageRating} allowHalf style={{ fontSize: '14px' }} />
                <Text type="secondary" style={{ marginLeft: '5px' }}>({reviewCount})</Text>
              </div>
              
              <div className="product-price">
                <Text strong style={{ fontSize: '16px' }}>₹{formattedLowestPrice}</Text>
                {lowestPrice !== highestPrice && (
                  <Text type="secondary" style={{ marginLeft: '5px' }}>- ₹{formattedHighestPrice}</Text>
                )}
              </div>
              
              <div className="product-stores">
                <Text type="secondary">Available at: </Text>
                <Space size={[0, 4]} wrap>
                  {stores.map((store, index) => (
                    <Tag key={index} color="blue">{store}</Tag>
                  ))}
                </Space>
              </div>
            </Space>
          }
        />
      </Link>
    </Card>
  );
};

export default ProductCard;
