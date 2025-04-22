import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Typography, 
  Breadcrumb, 
  Card, 
  Spin, 
  Empty, 
  Slider, 
  Checkbox, 
  Button, 
  Divider, 
  Select, 
  Space, 
  Pagination,
  Tabs,
  Avatar
} from 'antd';
import { 
  HomeOutlined, 
  FilterOutlined, 
  ReloadOutlined 
} from '@ant-design/icons';
import ProductCard from '../components/product/ProductCard';
import { brandLogos, productImages } from '../utils/images';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const BrandPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState(null);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    const fetchBrandData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate a delay and use mock data
        setTimeout(() => {
          // Find the brand based on the slug
          const brandData = {
            apple: {
              name: 'Apple',
              slug: 'apple',
              logo: brandLogos.apple,
              description: 'Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
              categories: ['Mobiles', 'Laptops', 'Wearables', 'Audio'],
              founded: '1976',
              headquarters: 'Cupertino, California, United States',
              website: 'https://www.apple.com'
            },
            samsung: {
              name: 'Samsung',
              slug: 'samsung',
              logo: brandLogos.samsung,
              description: 'Samsung Electronics Co., Ltd. is a South Korean multinational electronics company that manufactures a wide range of consumer and industrial electronic equipment.',
              categories: ['Mobiles', 'TVs', 'Wearables', 'Audio'],
              founded: '1969',
              headquarters: 'Suwon, South Korea',
              website: 'https://www.samsung.com'
            },
            sony: {
              name: 'Sony',
              slug: 'sony',
              logo: brandLogos.sony,
              description: 'Sony Corporation is a Japanese multinational conglomerate corporation that manufactures electronic products for the consumer and professional markets.',
              categories: ['Cameras', 'TVs', 'Audio'],
              founded: '1946',
              headquarters: 'Tokyo, Japan',
              website: 'https://www.sony.com'
            },
            dell: {
              name: 'Dell',
              slug: 'dell',
              logo: brandLogos.dell,
              description: 'Dell Technologies Inc. is an American multinational technology company that develops, sells, repairs, and supports computers and related products and services.',
              categories: ['Laptops'],
              founded: '1984',
              headquarters: 'Round Rock, Texas, United States',
              website: 'https://www.dell.com'
            },
            hp: {
              name: 'HP',
              slug: 'hp',
              logo: brandLogos.hp,
              description: 'HP Inc. is an American multinational information technology company that develops personal computers, printers and related supplies.',
              categories: ['Laptops'],
              founded: '1939',
              headquarters: 'Palo Alto, California, United States',
              website: 'https://www.hp.com'
            },
            lenovo: {
              name: 'Lenovo',
              slug: 'lenovo',
              logo: brandLogos.lenovo,
              description: 'Lenovo Group Limited is a Chinese multinational technology company that designs, develops, manufactures, and sells personal computers, tablets, smartphones, and more.',
              categories: ['Laptops'],
              founded: '1984',
              headquarters: 'Beijing, China',
              website: 'https://www.lenovo.com'
            }
          };
          
          const foundBrand = brandData[slug];
          
          if (foundBrand) {
            setBrand(foundBrand);
            setCategories(foundBrand.categories);
            
            // Generate mock products for this brand
            const mockProducts = [];
            
            // Use different products based on brand
            if (slug === 'apple') {
              mockProducts.push({
                id: 1,
                name: 'Apple iPhone 14 Pro',
                slug: 'apple-iphone-14-pro',
                brand: 'Apple',
                category: 'Mobiles',
                subcategory: 'Smartphones',
                images: [productImages.iphone14Pro[0]],
                lowestPrice: 119900,
                highestPrice: 129900,
                averageRating: 4.7,
                reviewCount: 245,
                stores: ['Amazon', 'Flipkart', 'Croma']
              });
              mockProducts.push({
                id: 2,
                name: 'MacBook Air M2',
                slug: 'macbook-air-m2',
                brand: 'Apple',
                category: 'Laptops',
                subcategory: 'MacBooks',
                images: [productImages.macbookAirM2],
                lowestPrice: 99900,
                highestPrice: 119900,
                averageRating: 4.6,
                reviewCount: 132,
                stores: ['Amazon', 'Flipkart', 'Apple Store']
              });
              mockProducts.push({
                id: 3,
                name: 'Apple Watch Series 8',
                slug: 'apple-watch-series-8',
                brand: 'Apple',
                category: 'Wearables',
                subcategory: 'Smartwatches',
                images: [productImages.appleWatchSeries8],
                lowestPrice: 41900,
                highestPrice: 45900,
                averageRating: 4.5,
                reviewCount: 112,
                stores: ['Amazon', 'Flipkart', 'Apple Store']
              });
            } else if (slug === 'samsung') {
              mockProducts.push({
                id: 1,
                name: 'Samsung Galaxy S23 Ultra',
                slug: 'samsung-galaxy-s23-ultra',
                brand: 'Samsung',
                category: 'Mobiles',
                subcategory: 'Smartphones',
                images: [productImages.galaxyS23Ultra],
                lowestPrice: 109900,
                highestPrice: 119900,
                averageRating: 4.5,
                reviewCount: 189,
                stores: ['Amazon', 'Flipkart', 'Samsung Shop']
              });
            } else if (slug === 'sony') {
              mockProducts.push({
                id: 1,
                name: 'Sony Alpha A7 IV',
                slug: 'sony-alpha-a7-iv',
                brand: 'Sony',
                category: 'Cameras',
                subcategory: 'Mirrorless',
                images: [productImages.sonyAlphaA7IV],
                lowestPrice: 241990,
                highestPrice: 259990,
                averageRating: 4.9,
                reviewCount: 87,
                stores: ['Amazon', 'Flipkart']
              });
              mockProducts.push({
                id: 2,
                name: 'Sony WH-1000XM5',
                slug: 'sony-wh-1000xm5',
                brand: 'Sony',
                category: 'Audio',
                subcategory: 'Headphones',
                images: [productImages.sonyWH1000XM5],
                lowestPrice: 26990,
                highestPrice: 29990,
                averageRating: 4.8,
                reviewCount: 156,
                stores: ['Amazon', 'Flipkart', 'Croma']
              });
            }
            
            setProducts(mockProducts);
            setTotalProducts(mockProducts.length);
            setLoading(false);
          } else {
            setError('Brand not found');
            setLoading(false);
          }
        }, 1000);
      } catch (err) {
        console.error('Error fetching brand data:', err);
        setError('Failed to fetch brand data. Please try again.');
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchBrandData();
    }
  }, [slug]);
  
  const handleSortChange = (value) => {
    setSortBy(value);
  };
  
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };
  
  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, we would fetch the products for the new page
  };
  
  const resetFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedCategories([]);
    setMobileFiltersVisible(false);
  };
  
  const applyFilters = () => {
    // In a real app, we would apply the filters and update the products
    setMobileFiltersVisible(false);
  };
  
  const handleTabChange = (key) => {
    setActiveTab(key);
    // In a real app, we would filter products by category
  };
  
  // Filter products based on active tab
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeTab);
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Text style={{ marginTop: 16 }}>Loading brand...</Text>
      </div>
    );
  }
  
  if (error || !brand) {
    return (
      <div className="error-container">
        <Title level={3}>Error</Title>
        <Text>{error || 'Brand not found'}</Text>
        <Button type="primary" style={{ marginTop: 16 }}>
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="brand-page">
      <div className="container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Brands</Breadcrumb.Item>
          <Breadcrumb.Item>{brand.name}</Breadcrumb.Item>
        </Breadcrumb>
        
        <div className="brand-header">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} sm={6} md={4}>
              <Avatar src={brand.logo} size={120} shape="square" />
            </Col>
            <Col xs={24} sm={18} md={20}>
              <div className="brand-info">
                <Title level={2}>{brand.name}</Title>
                <Paragraph>{brand.description}</Paragraph>
                <Row gutter={[16, 8]}>
                  <Col xs={12} sm={8}>
                    <Text type="secondary">Founded:</Text>
                    <div><Text strong>{brand.founded}</Text></div>
                  </Col>
                  <Col xs={12} sm={8}>
                    <Text type="secondary">Headquarters:</Text>
                    <div><Text strong>{brand.headquarters}</Text></div>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Text type="secondary">Website:</Text>
                    <div><a href={brand.website} target="_blank" rel="noopener noreferrer">{brand.website}</a></div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        
        <Divider />
        
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="All Products" key="all" />
          {categories.map(category => (
            <TabPane tab={category} key={category.toLowerCase()} />
          ))}
        </Tabs>
        
        <Row gutter={[24, 24]}>
          {/* Filters - Desktop */}
          <Col xs={0} sm={0} md={6} lg={5} xl={4} className="filters-column">
            <Card title="Filters" extra={<Button type="link" onClick={resetFilters} icon={<ReloadOutlined />}>Reset</Button>}>
              <div className="filter-section">
                <Title level={5}>Price Range</Title>
                <Slider
                  range
                  min={0}
                  max={200000}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  tipFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                />
                <div className="price-range-display">
                  <Text>₹{priceRange[0].toLocaleString('en-IN')}</Text>
                  <Text>₹{priceRange[1].toLocaleString('en-IN')}</Text>
                </div>
              </div>
              
              {activeTab === 'all' && (
                <>
                  <Divider />
                  <div className="filter-section">
                    <Title level={5}>Categories</Title>
                    <Checkbox.Group 
                      options={categories} 
                      value={selectedCategories} 
                      onChange={handleCategoryChange} 
                      className="filter-checkbox-group"
                    />
                  </div>
                </>
              )}
            </Card>
          </Col>
          
          {/* Products */}
          <Col xs={24} sm={24} md={18} lg={19} xl={20}>
            {/* Sort and Filter Bar */}
            <div className="sort-filter-bar">
              <div className="results-count">
                <Text>{filteredProducts.length} results</Text>
              </div>
              
              <Space>
                <div className="sort-dropdown">
                  <Text>Sort by: </Text>
                  <Select 
                    value={sortBy} 
                    onChange={handleSortChange}
                    style={{ width: 150 }}
                  >
                    <Option value="relevance">Relevance</Option>
                    <Option value="price_low">Price: Low to High</Option>
                    <Option value="price_high">Price: High to Low</Option>
                    <Option value="rating">Rating</Option>
                    <Option value="newest">Newest First</Option>
                  </Select>
                </div>
                
                <Button 
                  icon={<FilterOutlined />} 
                  onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
                  className="mobile-filter-button"
                >
                  Filters
                </Button>
              </Space>
            </div>
            
            {/* Mobile Filters */}
            {mobileFiltersVisible && (
              <div className="mobile-filters">
                <Card title="Filters">
                  <div className="filter-section">
                    <Title level={5}>Price Range</Title>
                    <Slider
                      range
                      min={0}
                      max={200000}
                      value={priceRange}
                      onChange={handlePriceRangeChange}
                      tipFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    />
                    <div className="price-range-display">
                      <Text>₹{priceRange[0].toLocaleString('en-IN')}</Text>
                      <Text>₹{priceRange[1].toLocaleString('en-IN')}</Text>
                    </div>
                  </div>
                  
                  {activeTab === 'all' && (
                    <>
                      <Divider />
                      <div className="filter-section">
                        <Title level={5}>Categories</Title>
                        <Checkbox.Group 
                          options={categories} 
                          value={selectedCategories} 
                          onChange={handleCategoryChange} 
                          className="filter-checkbox-group"
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="filter-actions">
                    <Button onClick={resetFilters}>Reset</Button>
                    <Button type="primary" onClick={applyFilters}>Apply Filters</Button>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <Empty
                description={
                  <span>
                    No products found for this brand
                  </span>
                }
              />
            ) : (
              <>
                <Row gutter={[16, 16]}>
                  {filteredProducts.map(product => (
                    <Col xs={12} sm={12} md={8} lg={6} key={product.id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
                
                {filteredProducts.length > 20 && (
                  <div className="pagination-container">
                    <Pagination
                      current={currentPage}
                      total={filteredProducts.length}
                      pageSize={20}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BrandPage;
