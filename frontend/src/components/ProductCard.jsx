import { Card, Button, Tag, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
  const { store, title, price, image, link } = product;

  // Format price with commas for Indian Rupee format
  const formattedPrice = price.toLocaleString("en-IN");

  // Determine store color
  const storeColor = store === "Amazon" ? "#FF9900" : "#2874F0";

  return (
    <Card
      hoverable
      style={{ width: "100%", marginBottom: 16 }}
      cover={
        <div
          style={{
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            overflow: "hidden",
          }}
        >
          <img
            alt={title}
            src={image}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      }
      actions={[
        <Button type="primary" onClick={() => window.open(link, "_blank")}>
          Buy Now
        </Button>,
      ]}
    >
      <Tag color={storeColor} style={{ marginBottom: 8 }}>
        {store}
      </Tag>
      <Meta
        title={title}
        description={
          <Text strong style={{ fontSize: 18 }}>
            ₹{formattedPrice}
          </Text>
        }
      />
    </Card>
  );
};

export default ProductCard;
