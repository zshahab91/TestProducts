import React from 'react';
import { NextPage } from 'next';
import AdminLayout from '@components/AdminLayout';
import Edit from '@components/CategoriesPage/EditCategory';
import { Row, Col } from 'antd';

const CategoriesAddPage: NextPage = () => {
  return (
    <AdminLayout title="ویرایش دسته بندی">
      <Row gutter={15}>
        <Col xs={24} md={8} lg={8} xl={8}>
          <Edit />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default CategoriesAddPage;
