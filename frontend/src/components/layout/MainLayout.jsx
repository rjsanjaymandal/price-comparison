import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="main-layout">
      <Header />
      <Content className="main-content">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
