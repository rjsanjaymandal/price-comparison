import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productImages } from "../utils/images";
import {
  Row,
  Col,
  Typography,
  Breadcrumb,
  Spin,
  Image,
  Tabs,
  Rate,
  Button,
  Space,
  Divider,
  Card,
  Table,
  Tag,
  Carousel,
} from "antd";
import {
  HomeOutlined,
  HeartOutlined,
  BellOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import PriceComparisonTable from "../components/product/PriceComparisonTable";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // In a real app, this would be an API call
        // For now, we'll use sample data
        setTimeout(() => {
          setProduct({
            id: 1,
            name: "Apple iPhone 14 Pro (128GB) - Deep Purple",
            slug: "apple-iphone-14-pro-128gb-deep-purple",
            brand: "Apple",
            category: "Mobiles",
            subcategory: "Smartphones",
            description:
              "The iPhone 14 Pro comes with a 6.1-inch ProMotion OLED display with Always-On feature, A16 Bionic chip, 48MP main camera, and iOS 16.",
            images: productImages.iphone14Pro,
            lowestPrice: 119900,
            highestPrice: 129900,
            averageRating: 4.7,
            reviewCount: 245,
            specifications: [
              {
                name: "Display",
                value:
                  "6.1-inch Super Retina XDR display with ProMotion and Always-On",
              },
              { name: "Processor", value: "A16 Bionic chip" },
              { name: "Storage", value: "128GB" },
              {
                name: "Rear Camera",
                value: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
              },
              { name: "Front Camera", value: "12MP TrueDepth camera" },
              { name: "Battery", value: "Up to 23 hours of video playback" },
              { name: "OS", value: "iOS 16" },
              {
                name: "Water Resistance",
                value: "IP68 (maximum depth of 6 meters up to 30 minutes)",
              },
              { name: "Dimensions", value: "147.5 x 71.5 x 7.85 mm" },
              { name: "Weight", value: "206 grams" },
            ],
            prices: [
              {
                id: 1,
                store: "Amazon",
                price: 119900,
                originalPrice: 129900,
                discount: 8,
                inStock: true,
                deliveryInfo: "Free delivery by Tomorrow",
                offers: [
                  "10% off with HDFC Bank Cards",
                  "No Cost EMI available",
                ],
                link: "https://www.amazon.in",
              },
              {
                id: 2,
                store: "Flipkart",
                price: 118499,
                originalPrice: 129900,
                discount: 9,
                inStock: true,
                deliveryInfo: "Delivery by day after tomorrow",
                offers: ["5% Cashback on Flipkart Axis Bank Card"],
                link: "https://www.flipkart.com",
              },
              {
                id: 3,
                store: "Croma",
                price: 121999,
                originalPrice: 129900,
                discount: 6,
                inStock: true,
                deliveryInfo: "Delivery in 3-4 days",
                offers: ["Extra 5% off on Croma Gift Cards"],
                link: "https://www.croma.com",
              },
              {
                id: 4,
                store: "Apple Store",
                price: 129900,
                originalPrice: null,
                discount: 0,
                inStock: true,
                deliveryInfo: "Free delivery in 1-3 business days",
                offers: [
                  "Free engraving",
                  "Trade in your smartphone for credit",
                ],
                link: "https://www.apple.com/in",
              },
            ],
            reviews: [
              {
                id: 1,
                user: "John D.",
                rating: 5,
                date: "2023-01-15",
                title: "Best iPhone Ever",
                comment:
                  "The camera is amazing and the battery life is much improved over previous models.",
              },
              {
                id: 2,
                user: "Sarah M.",
                rating: 4,
                date: "2023-02-10",
                title: "Great phone but expensive",
                comment:
                  "Love the phone but the price is quite high. The always-on display is a nice feature.",
              },
              {
                id: 3,
                user: "Rahul S.",
                rating: 5,
                date: "2023-03-05",
                title: "Worth every penny",
                comment:
                  "The A16 chip is blazing fast and the camera system is professional grade.",
              },
            ],
            similarProducts: [
              {
                id: 2,
                name: "Apple iPhone 14 (128GB) - Blue",
                slug: "apple-iphone-14-128gb-blue",
                brand: "Apple",
                category: "Mobiles",
                images: [productImages.iphone14],
                lowestPrice: 69999,
                highestPrice: 79900,
                averageRating: 4.5,
                reviewCount: 189,
                stores: ["Amazon", "Flipkart", "Croma"],
              },
              {
                id: 3,
                name: "Samsung Galaxy S23 Ultra (256GB)",
                slug: "samsung-galaxy-s23-ultra-256gb",
                brand: "Samsung",
                category: "Mobiles",
                images: [productImages.galaxyS23Ultra],
                lowestPrice: 124999,
                highestPrice: 129999,
                averageRating: 4.6,
                reviewCount: 156,
                stores: ["Amazon", "Flipkart", "Samsung Shop"],
              },
              {
                id: 4,
                name: "Google Pixel 7 Pro (128GB)",
                slug: "google-pixel-7-pro-128gb",
                brand: "Google",
                category: "Mobiles",
                images: [productImages.pixel7Pro],
                lowestPrice: 84999,
                highestPrice: 89999,
                averageRating: 4.4,
                reviewCount: 132,
                stores: ["Amazon", "Flipkart"],
              },
            ],
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details. Please try again.");
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Text style={{ marginTop: 16 }}>Loading product details...</Text>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <Title level={3}>Error</Title>
        <Text>{error || "Product not found"}</Text>
        <Button type="primary" style={{ marginTop: 16 }}>
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  const {
    name,
    brand,
    category,
    subcategory,
    description,
    images,
    lowestPrice,
    highestPrice,
    averageRating,
    reviewCount,
    specifications,
    prices,
    reviews,
    similarProducts,
  } = product;

  // Format price with commas for Indian Rupee format
  const formattedLowestPrice = lowestPrice.toLocaleString("en-IN");

  // Specifications table columns
  const specColumns = [
    {
      title: "Specification",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div className="product-detail-page">
      <div className="container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`/category/${category.toLowerCase()}`}>
            {category}
          </Breadcrumb.Item>
          {subcategory && (
            <Breadcrumb.Item
              href={`/category/${category.toLowerCase()}/${subcategory.toLowerCase()}`}
            >
              {subcategory}
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item>{name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={[24, 24]}>
          {/* Product Images */}
          <Col xs={24} sm={24} md={10} lg={8}>
            <div className="product-images">
              <Image.PreviewGroup>
                <Carousel autoplay>
                  {images.map((image, index) => (
                    <div key={index}>
                      <Image
                        src={image}
                        alt={`${name} - Image ${index + 1}`}
                        className="product-main-image"
                      />
                    </div>
                  ))}
                </Carousel>
              </Image.PreviewGroup>

              <div className="product-thumbnails">
                <Row gutter={[8, 8]}>
                  {images.map((image, index) => (
                    <Col span={6} key={index}>
                      <Image
                        src={image}
                        alt={`${name} - Thumbnail ${index + 1}`}
                        className="product-thumbnail"
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Col>

          {/* Product Info */}
          <Col xs={24} sm={24} md={14} lg={16}>
            <div className="product-info">
              <Title level={2}>{name}</Title>

              <div className="product-meta">
                <Space split={<Divider type="vertical" />}>
                  <Link to={`/brand/${brand.toLowerCase()}`}>
                    <Text strong>{brand}</Text>
                  </Link>
                  <div className="product-rating">
                    <Rate disabled defaultValue={averageRating} allowHalf />
                    <Text style={{ marginLeft: 8 }}>
                      {averageRating} ({reviewCount} reviews)
                    </Text>
                  </div>
                </Space>
              </div>

              <div className="product-price-section">
                <Title level={3} className="product-price">
                  ₹{formattedLowestPrice}
                </Title>
                {lowestPrice !== highestPrice && (
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    to ₹{highestPrice.toLocaleString("en-IN")}
                  </Text>
                )}

                <div className="product-actions">
                  <Space>
                    <Button icon={<HeartOutlined />}>Add to Wishlist</Button>
                    <Button icon={<BellOutlined />}>Price Alert</Button>
                    <Button icon={<ShareAltOutlined />}>Share</Button>
                  </Space>
                </div>
              </div>

              <Divider />

              <div className="product-description">
                <Paragraph>{description}</Paragraph>
              </div>

              <Divider />

              <PriceComparisonTable prices={prices} />
            </div>
          </Col>
        </Row>

        <div className="product-details-tabs">
          <Tabs defaultActiveKey="specifications">
            <TabPane tab="Specifications" key="specifications">
              <Table
                columns={specColumns}
                dataSource={specifications}
                rowKey="name"
                pagination={false}
                bordered
              />
            </TabPane>

            <TabPane tab={`Reviews (${reviewCount})`} key="reviews">
              <div className="reviews-section">
                <div className="review-summary">
                  <Title level={4}>Customer Reviews</Title>
                  <div className="rating-summary">
                    <Rate disabled defaultValue={averageRating} allowHalf />
                    <Text style={{ marginLeft: 8 }}>
                      {averageRating} out of 5
                    </Text>
                  </div>
                  <Text type="secondary">{reviewCount} customer ratings</Text>
                </div>

                <Divider />

                <div className="review-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <Space>
                          <Rate disabled defaultValue={review.rating} />
                          <Text strong>{review.title}</Text>
                        </Space>
                      </div>
                      <div className="review-meta">
                        <Text type="secondary">
                          By {review.user} on {review.date}
                        </Text>
                      </div>
                      <div className="review-content">
                        <Paragraph>{review.comment}</Paragraph>
                      </div>
                      <Divider />
                    </div>
                  ))}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>

        <div className="similar-products section">
          <Title level={3} className="section-title">
            Similar Products
          </Title>
          <Row gutter={[16, 16]}>
            {similarProducts.map((product) => (
              <Col xs={12} sm={8} md={6} key={product.id}>
                <Link to={`/product/${product.slug}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={product.name}
                        src={product.images[0]}
                        className="similar-product-image"
                      />
                    }
                  >
                    <Card.Meta
                      title={product.name}
                      description={
                        <Space direction="vertical" size={2}>
                          <Text>
                            ₹{product.lowestPrice.toLocaleString("en-IN")}
                          </Text>
                          <Rate
                            disabled
                            defaultValue={product.averageRating}
                            allowHalf
                            style={{ fontSize: 12 }}
                          />
                        </Space>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
