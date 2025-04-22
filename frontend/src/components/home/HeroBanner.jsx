import { Carousel, Typography, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { bannerImages } from "../../utils/images";

const { Title, Paragraph } = Typography;
const { Search } = Input;

const banners = [
  {
    id: 1,
    title: "Compare Prices Across Multiple Stores",
    description:
      "Find the best deals on your favorite products from Amazon, Flipkart, and more",
    image: bannerImages.compare,
    color: "#1890ff",
  },
  {
    id: 2,
    title: "Latest Smartphones at Best Prices",
    description: "Compare prices for the newest smartphones and save big",
    image: bannerImages.smartphones,
    color: "#52c41a",
  },
  {
    id: 3,
    title: "Track Price Drops",
    description: "Get notified when prices drop for your favorite products",
    image: bannerImages.priceDrops,
    color: "#722ed1",
  },
];

const HeroBanner = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="hero-banner">
      <Carousel autoplay effect="fade">
        {banners.map((banner) => (
          <div key={banner.id}>
            <div
              className="banner-slide"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner.image})`,
                backgroundColor: banner.color,
              }}
            >
              <div className="banner-content">
                <Title level={1} style={{ color: "white" }}>
                  {banner.title}
                </Title>
                <Paragraph style={{ color: "white", fontSize: "18px" }}>
                  {banner.description}
                </Paragraph>
                <div className="banner-search">
                  <Search
                    placeholder="Search for products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onSearch={handleSearch}
                    enterButton={
                      <Button type="primary" icon={<SearchOutlined />}>
                        Search
                      </Button>
                    }
                    size="large"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
