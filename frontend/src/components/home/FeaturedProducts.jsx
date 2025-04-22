import { useState, useEffect } from "react";
import { Row, Col, Typography, Tabs, Spin } from "antd";
import ProductCard from "../product/ProductCard";
import axios from "axios";
import { productImages } from "../../utils/images";

const { Title } = Typography;
const { TabPane } = Tabs;

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [popularProducts, setPopularProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("popular");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // In a real app, these would be API calls to your backend
        // For now, we'll use sample data
        const sampleProducts = [
          {
            id: 1,
            name: "Apple iPhone 14 Pro",
            slug: "apple-iphone-14-pro",
            brand: "Apple",
            category: "Mobiles",
            images: [productImages.iphone14Pro[0]],
            lowestPrice: 119900,
            highestPrice: 129900,
            averageRating: 4.7,
            reviewCount: 245,
            stores: ["Amazon", "Flipkart", "Croma"],
          },
          {
            id: 2,
            name: "Samsung Galaxy S23 Ultra",
            slug: "samsung-galaxy-s23-ultra",
            brand: "Samsung",
            category: "Mobiles",
            images: [productImages.galaxyS23Ultra],
            lowestPrice: 109900,
            highestPrice: 119900,
            averageRating: 4.5,
            reviewCount: 189,
            stores: ["Amazon", "Flipkart", "Samsung Shop"],
          },
          {
            id: 3,
            name: "Sony WH-1000XM5",
            slug: "sony-wh-1000xm5",
            brand: "Sony",
            category: "Audio",
            images: [productImages.sonyWH1000XM5],
            lowestPrice: 26990,
            highestPrice: 29990,
            averageRating: 4.8,
            reviewCount: 156,
            stores: ["Amazon", "Flipkart", "Croma"],
          },
          {
            id: 4,
            name: "MacBook Air M2",
            slug: "macbook-air-m2",
            brand: "Apple",
            category: "Laptops",
            images: [productImages.macbookAirM2],
            lowestPrice: 99900,
            highestPrice: 119900,
            averageRating: 4.6,
            reviewCount: 132,
            stores: ["Amazon", "Flipkart", "Apple Store"],
          },
          {
            id: 5,
            name: "Sony Alpha A7 IV",
            slug: "sony-alpha-a7-iv",
            brand: "Sony",
            category: "Cameras",
            images: [productImages.sonyAlphaA7IV],
            lowestPrice: 241990,
            highestPrice: 259990,
            averageRating: 4.9,
            reviewCount: 87,
            stores: ["Amazon", "Flipkart"],
          },
          {
            id: 6,
            name: "Apple Watch Series 8",
            slug: "apple-watch-series-8",
            brand: "Apple",
            category: "Wearables",
            images: [productImages.appleWatchSeries8],
            lowestPrice: 41900,
            highestPrice: 45900,
            averageRating: 4.5,
            reviewCount: 112,
            stores: ["Amazon", "Flipkart", "Apple Store"],
          },
        ];

        setPopularProducts(sampleProducts);
        setNewProducts([...sampleProducts].reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="featured-products section">
      <Title level={2} className="section-title">
        Featured Products
      </Title>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Popular Products" key="popular">
          {loading ? (
            <div className="loading-container">
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {popularProducts.map((product) => (
                <Col xs={12} sm={8} md={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </TabPane>

        <TabPane tab="New Arrivals" key="new">
          {loading ? (
            <div className="loading-container">
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {newProducts.map((product) => (
                <Col xs={12} sm={8} md={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FeaturedProducts;
