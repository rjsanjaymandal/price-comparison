import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import BrandPage from "./pages/BrandPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 4,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="brand/:slug" element={<BrandPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="wishlist" element={<ProfilePage />} />
            <Route path="price-alerts" element={<ProfilePage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
