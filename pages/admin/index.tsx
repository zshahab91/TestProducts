import React, { useEffect } from 'react';
import AdminLayout from '@components/AdminLayout';
import { NextPage } from 'next';
import BreadcrumbPage from '@components/Breadcrumb';





const Index: NextPage = () => {
  return (
    <AdminLayout title="داشبورد">
      <BreadcrumbPage
        listLinks={[
          { name: 'Home', route: '/' }
        ]}
      />
    </AdminLayout>
  );
};

export default Index;
