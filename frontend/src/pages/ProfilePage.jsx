import { useState } from 'react';
import { 
  Row, 
  Col, 
  Typography, 
  Tabs, 
  Card, 
  Avatar, 
  Form, 
  Input, 
  Button, 
  List, 
  Tag, 
  Space, 
  Divider,
  Empty
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined, 
  HeartOutlined, 
  BellOutlined, 
  HistoryOutlined,
  EditOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { productImages } from '../utils/images';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Bangalore, Karnataka, 560001',
    wishlist: [
      {
        id: 1,
        name: 'Apple iPhone 14 Pro',
        slug: 'apple-iphone-14-pro',
        image: productImages.iphone14Pro[0],
        price: 119900,
        store: 'Amazon',
        addedOn: '2023-05-15'
      },
      {
        id: 2,
        name: 'Sony WH-1000XM5',
        slug: 'sony-wh-1000xm5',
        image: productImages.sonyWH1000XM5,
        price: 26990,
        store: 'Flipkart',
        addedOn: '2023-06-10'
      }
    ],
    priceAlerts: [
      {
        id: 1,
        name: 'MacBook Air M2',
        slug: 'macbook-air-m2',
        image: productImages.macbookAirM2,
        currentPrice: 99900,
        targetPrice: 90000,
        store: 'Amazon',
        createdOn: '2023-04-20'
      }
    ],
    recentlyViewed: [
      {
        id: 1,
        name: 'Samsung Galaxy S23 Ultra',
        slug: 'samsung-galaxy-s23-ultra',
        image: productImages.galaxyS23Ultra,
        price: 109900,
        store: 'Samsung Shop',
        viewedOn: '2023-06-18'
      },
      {
        id: 2,
        name: 'Apple iPhone 14 Pro',
        slug: 'apple-iphone-14-pro',
        image: productImages.iphone14Pro[0],
        price: 119900,
        store: 'Amazon',
        viewedOn: '2023-06-17'
      },
      {
        id: 3,
        name: 'Sony Alpha A7 IV',
        slug: 'sony-alpha-a7-iv',
        image: productImages.sonyAlphaA7IV,
        price: 241990,
        store: 'Flipkart',
        viewedOn: '2023-06-15'
      }
    ]
  };
  
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  const toggleEdit = () => {
    setEditing(!editing);
  };
  
  const onFinish = (values) => {
    console.log('Updated profile:', values);
    setEditing(false);
  };
  
  return (
    <div className="profile-page">
      <div className="container">
        <Title level={2}>My Account</Title>
        
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane 
            tab={<span><UserOutlined /> Profile</span>} 
            key="profile"
          >
            <Card 
              title="Personal Information" 
              extra={
                <Button 
                  type="link" 
                  icon={editing ? <SaveOutlined /> : <EditOutlined />} 
                  onClick={toggleEdit}
                >
                  {editing ? 'Save' : 'Edit'}
                </Button>
              }
            >
              {editing ? (
                <Form
                  layout="vertical"
                  initialValues={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                  }}
                  onFinish={onFinish}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input prefix={<UserOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input prefix={<MailOutlined />} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                      >
                        <Input prefix={<PhoneOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter your address' }]}
                      >
                        <Input.TextArea rows={3} prefix={<HomeOutlined />} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <div className="profile-info">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={6}>
                      <Avatar size={100} icon={<UserOutlined />} />
                    </Col>
                    <Col xs={24} md={18}>
                      <div className="profile-details">
                        <div className="profile-item">
                          <UserOutlined className="profile-icon" />
                          <div>
                            <Text type="secondary">Name</Text>
                            <Paragraph strong>{user.name}</Paragraph>
                          </div>
                        </div>
                        <div className="profile-item">
                          <MailOutlined className="profile-icon" />
                          <div>
                            <Text type="secondary">Email</Text>
                            <Paragraph strong>{user.email}</Paragraph>
                          </div>
                        </div>
                        <div className="profile-item">
                          <PhoneOutlined className="profile-icon" />
                          <div>
                            <Text type="secondary">Phone</Text>
                            <Paragraph strong>{user.phone}</Paragraph>
                          </div>
                        </div>
                        <div className="profile-item">
                          <HomeOutlined className="profile-icon" />
                          <div>
                            <Text type="secondary">Address</Text>
                            <Paragraph strong>{user.address}</Paragraph>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Card>
          </TabPane>
          
          <TabPane 
            tab={<span><HeartOutlined /> Wishlist</span>} 
            key="wishlist"
          >
            {user.wishlist.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={user.wishlist}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button type="link" danger>Remove</Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={64} src={item.image} />}
                      title={<Link to={`/product/${item.slug}`}>{item.name}</Link>}
                      description={
                        <Space direction="vertical">
                          <Text strong>₹{item.price.toLocaleString('en-IN')}</Text>
                          <Space>
                            <Tag color="blue">{item.store}</Tag>
                            <Text type="secondary">Added on {item.addedOn}</Text>
                          </Space>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="Your wishlist is empty" />
            )}
          </TabPane>
          
          <TabPane 
            tab={<span><BellOutlined /> Price Alerts</span>} 
            key="alerts"
          >
            {user.priceAlerts.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={user.priceAlerts}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button type="link">Edit</Button>,
                      <Button type="link" danger>Remove</Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={64} src={item.image} />}
                      title={<Link to={`/product/${item.slug}`}>{item.name}</Link>}
                      description={
                        <Space direction="vertical">
                          <Space>
                            <Text>Current Price: <Text strong>₹{item.currentPrice.toLocaleString('en-IN')}</Text></Text>
                            <Divider type="vertical" />
                            <Text>Target Price: <Text strong type="success">₹{item.targetPrice.toLocaleString('en-IN')}</Text></Text>
                          </Space>
                          <Space>
                            <Tag color="blue">{item.store}</Tag>
                            <Text type="secondary">Created on {item.createdOn}</Text>
                          </Space>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="You don't have any price alerts" />
            )}
          </TabPane>
          
          <TabPane 
            tab={<span><HistoryOutlined /> Recently Viewed</span>} 
            key="history"
          >
            {user.recentlyViewed.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={user.recentlyViewed}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={64} src={item.image} />}
                      title={<Link to={`/product/${item.slug}`}>{item.name}</Link>}
                      description={
                        <Space direction="vertical">
                          <Text strong>₹{item.price.toLocaleString('en-IN')}</Text>
                          <Space>
                            <Tag color="blue">{item.store}</Tag>
                            <Text type="secondary">Viewed on {item.viewedOn}</Text>
                          </Space>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="No recently viewed products" />
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
