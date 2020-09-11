import React from 'react';
import { Col, Row } from 'antd';
import { NextPage } from 'next';
import AdminLayout from '@components/AdminLayout';
import AddCategory from '@components/CategoriesPage/AddCategory';
import BreadcrumbPage from '@components/Breadcrumb';

const CategoriesAddPage: NextPage = () => {
  return (
    <AdminLayout title="ایجاد دسته بندی">
      <BreadcrumbPage
        listLinks={[
          { name: 'صفحه اصلی', route: '/' },
          { name: 'دسته بندی ها', route: '/categories' },
          { name: 'ایجاد دسته بندی' },
        ]}
      />
      <Row gutter={15}>
        <Col xs={24} md={8} lg={8} xl={8}>
          <AddCategory />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default CategoriesAddPage;
