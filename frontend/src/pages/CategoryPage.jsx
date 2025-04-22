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
  Pagination 
} from 'antd';
import { 
  HomeOutlined, 
  FilterOutlined, 
  ReloadOutlined 
} from '@ant-design/icons';
import ProductCard from '../components/product/ProductCard';
import { categoryImages, productImages } from '../utils/images';

const { Title, Text } = Typography;
const { Option } = Select;

const CategoryPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate a delay and use mock data
        setTimeout(() => {
          // Find the category based on the slug
          const categoryData = {
            mobiles: {
              name: 'Mobiles',
              slug: 'mobiles',
              image: categoryImages.mobiles,
              description: 'Compare prices for the latest smartphones',
              subcategories: ['Smartphones', 'Feature Phones', 'Accessories'],
              brands: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'Oppo']
            },
            laptops: {
              name: 'Laptops',
              slug: 'laptops',
              image: categoryImages.laptops,
              description: 'Find the best deals on laptops and notebooks',
              subcategories: ['Gaming Laptops', 'Ultrabooks', 'Chromebooks', 'MacBooks'],
              brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI']
            },
            cameras: {
              name: 'Cameras',
              slug: 'cameras',
              image: categoryImages.cameras,
              description: 'Compare prices for DSLRs and mirrorless cameras',
              subcategories: ['DSLR', 'Mirrorless', 'Point & Shoot', 'Action Cameras'],
              brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'GoPro']
            },
            tvs: {
              name: 'TVs',
              slug: 'tvs',
              image: categoryImages.tvs,
              description: 'Get the best prices on smart TVs and home theaters',
              subcategories: ['Smart TVs', 'OLED TVs', 'QLED TVs', 'LED TVs', '4K TVs'],
              brands: ['Samsung', 'LG', 'Sony', 'TCL', 'Xiaomi', 'OnePlus', 'Vu']
            },
            audio: {
              name: 'Audio',
              slug: 'audio',
              image: categoryImages.audio,
              description: 'Compare headphones, speakers, and sound systems',
              subcategories: ['Headphones', 'Earbuds', 'Speakers', 'Soundbars', 'Home Theater'],
              brands: ['Sony', 'Bose', 'JBL', 'Sennheiser', 'Apple', 'Samsung', 'Boat']
            },
            wearables: {
              name: 'Wearables',
              slug: 'wearables',
              image: categoryImages.wearables,
              description: 'Find deals on smartwatches and fitness trackers',
              subcategories: ['Smartwatches', 'Fitness Trackers', 'Smart Bands'],
              brands: ['Apple', 'Samsung', 'Fitbit', 'Garmin', 'Amazfit', 'Noise', 'Boat']
            }
          };
          
          const foundCategory = categoryData[slug];
          
          if (foundCategory) {
            setCategory(foundCategory);
            setSubcategories(foundCategory.subcategories);
            setBrands(foundCategory.brands);
            
            // Generate mock products for this category
            const mockProducts = [];
            
            // Use different products based on category
            if (slug === 'mobiles') {
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
              mockProducts.push({
                id: 3,
                name: 'Google Pixel 7 Pro',
                slug: 'google-pixel-7-pro',
                brand: 'Google',
                category: 'Mobiles',
                subcategory: 'Smartphones',
                images: [productImages.pixel7Pro],
                lowestPrice: 84999,
                highestPrice: 89999,
                averageRating: 4.4,
                reviewCount: 132,
                stores: ['Amazon', 'Flipkart']
              });
            } else if (slug === 'laptops') {
              mockProducts.push({
                id: 1,
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
            } else if (slug === 'cameras') {
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
            } else if (slug === 'audio') {
              mockProducts.push({
                id: 1,
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
            } else if (slug === 'wearables') {
              mockProducts.push({
                id: 1,
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
            }
            
            setProducts(mockProducts);
            setTotalProducts(mockProducts.length);
            setLoading(false);
          } else {
            setError('Category not found');
            setLoading(false);
          }
        }, 1000);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError('Failed to fetch category data. Please try again.');
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);
  
  const handleSortChange = (value) => {
    setSortBy(value);
  };
  
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };
  
  const handleBrandChange = (checkedValues) => {
    setSelectedBrands(checkedValues);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, we would fetch the products for the new page
  };
  
  const resetFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedBrands([]);
    setMobileFiltersVisible(false);
  };
  
  const applyFilters = () => {
    // In a real app, we would apply the filters and update the products
    setMobileFiltersVisible(false);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Text style={{ marginTop: 16 }}>Loading category...</Text>
      </div>
    );
  }
  
  if (error || !category) {
    return (
      <div className="error-container">
        <Title level={3}>Error</Title>
        <Text>{error || 'Category not found'}</Text>
        <Button type="primary" style={{ marginTop: 16 }}>
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="category-page">
      <div className="container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Categories</Breadcrumb.Item>
          <Breadcrumb.Item>{category.name}</Breadcrumb.Item>
        </Breadcrumb>
        
        <div className="category-header">
          <div className="category-info">
            <Title level={2}>{category.name}</Title>
            <Text>{category.description}</Text>
          </div>
        </div>
        
        {subcategories.length > 0 && (
          <div className="subcategories-section">
            <Title level={4}>Browse {category.name} by Category</Title>
            <Row gutter={[16, 16]}>
              {subcategories.map((subcategory, index) => (
                <Col xs={12} sm={8} md={6} lg={4} key={index}>
                  <Link to={`/category/${slug}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Card hoverable className="subcategory-card">
                      <Text strong>{subcategory}</Text>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
            <Divider />
          </div>
        )}
        
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
              
              <Divider />
              
              <div className="filter-section">
                <Title level={5}>Brands</Title>
                <Checkbox.Group 
                  options={brands} 
                  value={selectedBrands} 
                  onChange={handleBrandChange} 
                  className="filter-checkbox-group"
                />
              </div>
            </Card>
          </Col>
          
          {/* Products */}
          <Col xs={24} sm={24} md={18} lg={19} xl={20}>
            {/* Sort and Filter Bar */}
            <div className="sort-filter-bar">
              <div className="results-count">
                <Text>{totalProducts} results</Text>
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
                  
                  <Divider />
                  
                  <div className="filter-section">
                    <Title level={5}>Brands</Title>
                    <Checkbox.Group 
                      options={brands} 
                      value={selectedBrands} 
                      onChange={handleBrandChange} 
                      className="filter-checkbox-group"
                    />
                  </div>
                  
                  <div className="filter-actions">
                    <Button onClick={resetFilters}>Reset</Button>
                    <Button type="primary" onClick={applyFilters}>Apply Filters</Button>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Products Grid */}
            {products.length === 0 ? (
              <Empty
                description={
                  <span>
                    No products found in this category
                  </span>
                }
              />
            ) : (
              <>
                <Row gutter={[16, 16]}>
                  {products.map(product => (
                    <Col xs={12} sm={12} md={8} lg={6} key={product.id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
                
                {totalProducts > 0 && totalProducts > 20 && (
                  <div className="pagination-container">
                    <Pagination
                      current={currentPage}
                      total={totalProducts}
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

export default CategoryPage;
