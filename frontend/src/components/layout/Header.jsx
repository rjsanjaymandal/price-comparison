import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Input,
  Button,
  Dropdown,
  Space,
  Badge,
  Avatar,
  Row,
  Col,
  Divider,
} from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BellOutlined,
  HeartOutlined,
  DownOutlined,
  MobileOutlined,
  LaptopOutlined,
  CameraOutlined,
  AudioOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Search } = Input;

const categories = [
  { name: "Mobiles", slug: "mobiles", icon: <MobileOutlined /> },
  { name: "Laptops", slug: "laptops", icon: <LaptopOutlined /> },
  { name: "Cameras", slug: "cameras", icon: <CameraOutlined /> },
  { name: "TVs", slug: "tvs", icon: <HomeOutlined /> },
  { name: "Audio", slug: "audio", icon: <AudioOutlined /> },
  { name: "Wearables", slug: "wearables", icon: <AppstoreOutlined /> },
];

const AppHeader = () => {
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showCategoryNav, setShowCategoryNav] = useState(false);
  const navigate = useNavigate();

  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const toggleCategoryNav = () => {
    setShowCategoryNav(!showCategoryNav);
  };

  const categoryMenu = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category.slug} icon={category.icon}>
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="wishlist" icon={<HeartOutlined />}>
        <Link to="/wishlist">My Wishlist</Link>
      </Menu.Item>
      <Menu.Item key="alerts" icon={<BellOutlined />}>
        <Link to="/price-alerts">Price Alerts</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>PriceCompare</h1>
          </Link>
        </div>

        <div className="search-container">
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

        <div className="header-actions">
          {isMobile ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.SubMenu
                    title="Categories"
                    key="categories"
                    icon={<AppstoreOutlined />}
                  >
                    {categories.map((category) => (
                      <Menu.Item key={category.slug} icon={category.icon}>
                        <Link to={`/category/${category.slug}`}>
                          {category.name}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                  <Menu.Item key="wishlist" icon={<HeartOutlined />}>
                    <Link to="/wishlist">Wishlist</Link>
                  </Menu.Item>
                  <Menu.Item key="alerts" icon={<BellOutlined />}>
                    <Link to="/price-alerts">Price Alerts</Link>
                  </Menu.Item>
                  <Menu.Item key="profile" icon={<UserOutlined />}>
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button icon={<MenuOutlined />} />
            </Dropdown>
          ) : (
            <>
              <Button
                type="text"
                icon={<AppstoreOutlined />}
                onClick={toggleCategoryNav}
                className={showCategoryNav ? "active-nav-button" : ""}
              >
                Categories
              </Button>
              <Badge count={0} showZero={false}>
                <Link to="/wishlist">
                  <Button type="text" icon={<HeartOutlined />}>
                    Wishlist
                  </Button>
                </Link>
              </Badge>
              <Badge count={0} showZero={false}>
                <Link to="/price-alerts">
                  <Button type="text" icon={<BellOutlined />}>
                    Alerts
                  </Button>
                </Link>
              </Badge>
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <Button type="text" icon={<UserOutlined />}>
                  Account
                </Button>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </Header>

      {/* Category Navigation Bar */}
      {!isMobile && showCategoryNav && (
        <div className="category-nav">
          <div className="container">
            <Row gutter={16} justify="space-around">
              {categories.map(category => (
                <Col key={category.slug}>
                  <Link to={`/category/${category.slug}`} className="category-nav-item">
                    <Space direction="vertical" align="center" size={4}>
                      {category.icon}
                      <span>{category.name}</span>
                    </Space>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </>
  );

export default AppHeader;
