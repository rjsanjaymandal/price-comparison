import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Breadcrumb,
  Spin,
  Empty,
  Pagination,
  Card,
  Select,
  Slider,
  Checkbox,
  Divider,
  Space,
  Button,
} from "antd";
import {
  HomeOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ProductCard from "../components/product/ProductCard";
import { compareProducts } from "../services/api";

const { Title, Text } = Typography;
const { Option } = Select;

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  // Sample brands and stores for filters
  const brands = ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo"];
  const stores = ["Amazon", "Flipkart", "Croma", "Reliance Digital"];

  useEffect(() => {
    if (searchQuery) {
      fetchProducts();
    } else {
      setLoading(false);
      setProducts([]);
    }
  }, [searchQuery, currentPage, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await compareProducts(searchQuery);

      // In a real app, we would apply filters here based on the state
      // For now, we'll just use the response data
      setProducts(response.results || []);
      setTotalProducts(response.results ? response.results.length : 0);
    } catch (err) {
      console.error("Error searching products:", err);
      setError("Failed to fetch products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, we would update the URL with the page number
    // navigate(`/search?q=${searchQuery}&page=${page}`);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleBrandChange = (checkedValues) => {
    setSelectedBrands(checkedValues);
  };

  const handleStoreChange = (checkedValues) => {
    setSelectedStores(checkedValues);
  };

  const resetFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedBrands([]);
    setSelectedStores([]);
  };

  const applyFilters = () => {
    // In a real app, we would apply the filters and update the URL
    // For now, we'll just close the mobile filters panel
    setMobileFiltersVisible(false);
  };

  // Convert products to the format expected by ProductCard
  const formattedProducts = products.map((product, index) => ({
    id: index,
    name: product.title,
    slug: product.title.toLowerCase().replace(/\s+/g, "-"),
    brand: product.store,
    category: "Electronics",
    images: [product.image],
    lowestPrice: product.price,
    highestPrice: product.price,
    averageRating: 4.5,
    reviewCount: 100,
    stores: [product.store],
  }));

  return (
    <div className="search-results-page">
      <div className="container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Search</Breadcrumb.Item>
          <Breadcrumb.Item>{searchQuery}</Breadcrumb.Item>
        </Breadcrumb>

        <Title level={2}>Search Results for "{searchQuery}"</Title>

        <Row gutter={[24, 24]}>
          {/* Filters - Desktop */}
          <Col xs={0} sm={0} md={6} lg={5} xl={4} className="filters-column">
            <Card
              title="Filters"
              extra={
                <Button
                  type="link"
                  onClick={resetFilters}
                  icon={<ReloadOutlined />}
                >
                  Reset
                </Button>
              }
            >
              <div className="filter-section">
                <Title level={5}>Price Range</Title>
                <Slider
                  range
                  min={0}
                  max={200000}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  tipFormatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                />
                <div className="price-range-display">
                  <Text>₹{priceRange[0].toLocaleString("en-IN")}</Text>
                  <Text>₹{priceRange[1].toLocaleString("en-IN")}</Text>
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

              <Divider />

              <div className="filter-section">
                <Title level={5}>Stores</Title>
                <Checkbox.Group
                  options={stores}
                  value={selectedStores}
                  onChange={handleStoreChange}
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
                      tipFormatter={(value) =>
                        `₹${value.toLocaleString("en-IN")}`
                      }
                    />
                    <div className="price-range-display">
                      <Text>₹{priceRange[0].toLocaleString("en-IN")}</Text>
                      <Text>₹{priceRange[1].toLocaleString("en-IN")}</Text>
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

                  <Divider />

                  <div className="filter-section">
                    <Title level={5}>Stores</Title>
                    <Checkbox.Group
                      options={stores}
                      value={selectedStores}
                      onChange={handleStoreChange}
                      className="filter-checkbox-group"
                    />
                  </div>

                  <div className="filter-actions">
                    <Button onClick={resetFilters}>Reset</Button>
                    <Button type="primary" onClick={applyFilters}>
                      Apply Filters
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="loading-container">
                <Spin size="large" />
                <Text style={{ marginTop: 16 }}>Searching for products...</Text>
              </div>
            ) : error ? (
              <Empty description={<span>Error: {error}</span>} />
            ) : formattedProducts.length === 0 ? (
              <Empty
                description={
                  <span>
                    {searchQuery
                      ? `No products found for "${searchQuery}"`
                      : "Search for a product to compare prices"}
                  </span>
                }
              />
            ) : (
              <>
                <Row gutter={[16, 16]}>
                  {formattedProducts.map((product) => (
                    <Col xs={12} sm={12} md={8} lg={6} key={product.id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>

                {totalProducts > 0 && (
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

export default SearchResultsPage;
