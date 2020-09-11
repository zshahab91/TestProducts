import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Space, Table, Typography } from 'antd';
import AdminLayout from '@components/AdminLayout';
import TableEditButton from '@components/CP/TableEditButton';
import TableAddButton from '@components/CP/TableAddButton';
import Category from '@entities/category';


const columns = [
  {
    title: 'شماره',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'نام',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'کد',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'عملیات',
    dataIndex: 'id',
    key: 'id',
    render: (id: number) => (
      <>
        <TableEditButton href={`categories/${id}/edit`} />
      </>
    ),
  },
];

const CategoryListPage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [categories, setCategories] = useState<Category[]>();
  const [ totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(5);
  useEffect(()=> {
    //@ts-ignore
    const data = localStorage.getItem('categories') !== null ?  JSON.parse(localStorage.getItem('categories')) : [];
    if(data){
      setTotalItems(data.length);
      //@ts-ignore
      setCategories(data);

    }
  }, [])

  const pagination = totalItems! > perPage! && {
    total: totalItems,
    pageSize: perPage,
    current: pageIndex,
    onChange: setPageIndex,
  };

  console.log("categories is:",typeof categories)

  return (
    <AdminLayout title="لیست دسته بندی ها">
      <Typography.Title level={4}>دسته بندی</Typography.Title>
      <TableAddButton href="/categories/create" />
      <Table
        rowKey={(e) => e.id}
        dataSource={categories}
        bordered
        columns={columns}
        pagination={pagination}
        style={{ width: '100%' }}
      />
    </AdminLayout>
  );
};


export default CategoryListPage;
