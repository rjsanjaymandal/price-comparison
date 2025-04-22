import { Row, Col, Card, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { brandLogos } from "../../utils/images";

const { Title } = Typography;
const { Meta } = Card;

const brands = [
  {
    name: "Apple",
    slug: "apple",
    logo: brandLogos.apple,
  },
  {
    name: "Samsung",
    slug: "samsung",
    logo: brandLogos.samsung,
  },
  {
    name: "Sony",
    slug: "sony",
    logo: brandLogos.sony,
  },
  {
    name: "Dell",
    slug: "dell",
    logo: brandLogos.dell,
  },
  {
    name: "HP",
    slug: "hp",
    logo: brandLogos.hp,
  },
  {
    name: "Lenovo",
    slug: "lenovo",
    logo: brandLogos.lenovo,
  },
];

const PopularBrands = () => {
  return (
    <div className="popular-brands section">
      <Title level={2} className="section-title">
        Popular Brands
      </Title>
      <Row gutter={[16, 16]}>
        {brands.map((brand) => (
          <Col xs={8} sm={6} md={4} key={brand.slug}>
            <Link to={`/brand/${brand.slug}`}>
              <Card hoverable className="brand-card">
                <div className="brand-logo-container">
                  <Avatar
                    src={brand.logo}
                    alt={brand.name}
                    size={80}
                    shape="square"
                  />
                </div>
                <Meta title={brand.name} className="brand-name" />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularBrands;
