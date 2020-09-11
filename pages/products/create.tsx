import React from 'react';
import { Col, Row } from 'antd';
import { NextPage } from 'next';
import AdminLayout from '@components/AdminLayout';
import AddProduct from '@components/ProductsPage/AddProduct';
import BreadcrumbPage from '@components/Breadcrumb';

const ProductAddPage: NextPage = () => {
  return (
    <AdminLayout title="ایجاد محصول">
      <BreadcrumbPage
        listLinks={[
          { name: 'صفحه اصلی', route: '/' },
          { name: 'محصولات', route: '/products' },
          { name: 'ایجاد  محصول' },
        ]}
      />
      <Row gutter={15}>
        <Col xs={24} md={8} lg={8} xl={8}>
          <AddProduct />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default ProductAddPage;
