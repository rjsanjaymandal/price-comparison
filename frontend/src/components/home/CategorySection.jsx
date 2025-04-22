import { Row, Col, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { categoryImages } from "../../utils/images";

const { Title } = Typography;
const { Meta } = Card;

const categories = [
  {
    name: "Mobiles",
    slug: "mobiles",
    image: categoryImages.mobiles,
    description: "Compare prices for the latest smartphones",
  },
  {
    name: "Laptops",
    slug: "laptops",
    image: categoryImages.laptops,
    description: "Find the best deals on laptops and notebooks",
  },
  {
    name: "Cameras",
    slug: "cameras",
    image: categoryImages.cameras,
    description: "Compare prices for DSLRs and mirrorless cameras",
  },
  {
    name: "TVs",
    slug: "tvs",
    image: categoryImages.tvs,
    description: "Get the best prices on smart TVs and home theaters",
  },
  {
    name: "Audio",
    slug: "audio",
    image: categoryImages.audio,
    description: "Compare headphones, speakers, and sound systems",
  },
  {
    name: "Wearables",
    slug: "wearables",
    image: categoryImages.wearables,
    description: "Find deals on smartwatches and fitness trackers",
  },
];

const CategorySection = () => {
  return (
    <div className="category-section section">
      <Title level={2} className="section-title">
        Browse Categories
      </Title>
      <Row gutter={[16, 16]}>
        {categories.map((category) => (
          <Col xs={12} sm={8} md={8} lg={4} key={category.slug}>
            <Link to={`/category/${category.slug}`}>
              <Card
                hoverable
                cover={
                  <div className="category-image-container">
                    <img alt={category.name} src={category.image} />
                  </div>
                }
              >
                <Meta
                  title={category.name}
                  description={category.description}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategorySection;
