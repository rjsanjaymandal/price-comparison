import { Table, Typography, Button, Tag, Space, Tooltip } from 'antd';
import { ShoppingCartOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const PriceComparisonTable = ({ prices }) => {
  // If no prices provided, use sample data
  const priceData = prices || [
    {
      id: 1,
      store: 'Amazon',
      price: 69999,
      originalPrice: 79900,
      discount: 12,
      inStock: true,
      deliveryInfo: 'Free delivery by Tomorrow',
      offers: ['10% off with HDFC Bank Cards', 'No Cost EMI available'],
      link: 'https://www.amazon.in'
    },
    {
      id: 2,
      store: 'Flipkart',
      price: 68499,
      originalPrice: 79900,
      discount: 14,
      inStock: true,
      deliveryInfo: 'Delivery by day after tomorrow',
      offers: ['5% Cashback on Flipkart Axis Bank Card'],
      link: 'https://www.flipkart.com'
    },
    {
      id: 3,
      store: 'Croma',
      price: 71999,
      originalPrice: 79900,
      discount: 10,
      inStock: true,
      deliveryInfo: 'Delivery in 3-4 days',
      offers: ['Extra 5% off on Croma Gift Cards'],
      link: 'https://www.croma.com'
    },
    {
      id: 4,
      store: 'Reliance Digital',
      price: 72499,
      originalPrice: 79900,
      discount: 9,
      inStock: false,
      deliveryInfo: 'Currently unavailable',
      offers: [],
      link: 'https://www.reliancedigital.in'
    }
  ];

  // Sort by price (lowest first)
  const sortedPrices = [...priceData].sort((a, b) => a.price - b.price);

  // Find the lowest price
  const lowestPrice = sortedPrices.length > 0 ? sortedPrices[0].price : 0;

  const columns = [
    {
      title: 'Store',
      dataIndex: 'store',
      key: 'store',
      render: (store) => {
        let color;
        switch (store) {
          case 'Amazon':
            color = '#FF9900';
            break;
          case 'Flipkart':
            color = '#2874F0';
            break;
          case 'Croma':
            color = '#00B1E9';
            break;
          case 'Reliance Digital':
            color = '#E42529';
            break;
          default:
            color = '#1890ff';
        }
        return <Tag color={color} style={{ fontSize: '14px', padding: '2px 8px' }}>{store}</Tag>;
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) => {
        const formattedPrice = price.toLocaleString('en-IN');
        const formattedOriginalPrice = record.originalPrice ? record.originalPrice.toLocaleString('en-IN') : null;
        
        return (
          <Space direction="vertical" size={0}>
            <Text strong style={{ fontSize: '16px' }}>₹{formattedPrice}</Text>
            {record.originalPrice && (
              <Space size={4}>
                <Text delete type="secondary">₹{formattedOriginalPrice}</Text>
                <Text type="success">{record.discount}% off</Text>
              </Space>
            )}
            {price === lowestPrice && <Tag color="green">Lowest Price</Tag>}
          </Space>
        );
      },
      sorter: (a, b) => a.price - b.price,
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Availability',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (inStock, record) => (
        <Space direction="vertical" size={0}>
          {inStock ? (
            <Text type="success"><CheckCircleOutlined /> In Stock</Text>
          ) : (
            <Text type="danger"><CloseCircleOutlined /> Out of Stock</Text>
          )}
          <Text type="secondary">{record.deliveryInfo}</Text>
        </Space>
      ),
      filters: [
        { text: 'In Stock', value: true },
        { text: 'Out of Stock', value: false }
      ],
      onFilter: (value, record) => record.inStock === value
    },
    {
      title: 'Offers',
      dataIndex: 'offers',
      key: 'offers',
      render: (offers) => (
        <Space direction="vertical" size={2}>
          {offers && offers.length > 0 ? (
            offers.map((offer, index) => (
              <Text key={index} style={{ fontSize: '12px' }}>• {offer}</Text>
            ))
          ) : (
            <Text type="secondary">No offers available</Text>
          )}
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<ShoppingCartOutlined />} 
          onClick={() => window.open(record.link, '_blank')}
          disabled={!record.inStock}
        >
          Buy Now
        </Button>
      )
    }
  ];

  return (
    <div className="price-comparison-table">
      <Title level={3}>Price Comparison</Title>
      <Table 
        columns={columns} 
        dataSource={sortedPrices} 
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              <Text strong>Store: </Text>{record.store}<br />
              <Text strong>Price: </Text>₹{record.price.toLocaleString('en-IN')}<br />
              {record.originalPrice && (
                <>
                  <Text strong>Original Price: </Text>₹{record.originalPrice.toLocaleString('en-IN')}<br />
                  <Text strong>Discount: </Text>{record.discount}%<br />
                </>
              )}
              <Text strong>Availability: </Text>{record.inStock ? 'In Stock' : 'Out of Stock'}<br />
              <Text strong>Delivery: </Text>{record.deliveryInfo}<br />
              {record.offers && record.offers.length > 0 && (
                <>
                  <Text strong>Offers: </Text>
                  <ul>
                    {record.offers.map((offer, index) => (
                      <li key={index}>{offer}</li>
                    ))}
                  </ul>
                </>
              )}
            </p>
          ),
          expandRowByClick: true
        }}
      />
    </div>
  );
};

export default PriceComparisonTable;
