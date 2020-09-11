import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Space, Table, Typography } from 'antd';
import AdminLayout from '@components/AdminLayout';
import TableEditButton from '@components/CP/TableEditButton';
import TableAddButton from '@components/CP/TableAddButton';
import Product from '@entities/product';
import { useRouter } from 'next/router';


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
    title: 'قیمت',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'موجودی',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'دسته بندی',
    dataIndex: ['category', 'name'],
    key: 'category'
  },
  {
    title: 'عملیات',
    dataIndex: 'id',
    key: 'id',
    render: (id: number) => (
      <>
        <TableEditButton href={`products/${id}/edit`} />
      </>
    ),
  },
];

const ProductListPage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [ products, setProducts ] = useState<Product[]>();
  const [ totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const router = useRouter();

  useEffect(()=> {
    //@ts-ignore
    const data = localStorage.getItem('products') !== null ?  JSON.parse(localStorage.getItem('products')) : [];
    //@ts-ignore
    const categories = localStorage.getItem('categories') !== null ?  JSON.parse(localStorage.getItem('categories')) : [];
    if(categories.length === 0 ){
      router.push(`/categories`);
    }

    if(data){
      setTotalItems(data.length);
      //@ts-ignore
      setProducts(data);

    }
  }, [])

  const pagination = totalItems! > perPage! && {
    total: totalItems,
    pageSize: perPage,
    current: pageIndex,
    onChange: setPageIndex,
  };

  return (
    <AdminLayout title="لیست دسته بندی ها">
      <Typography.Title level={4}>دسته بندی</Typography.Title>
      <TableAddButton href="/products/create" />
      <Table
        rowKey={(e) => e.id}
        dataSource={products}
        bordered
        columns={columns}
        pagination={pagination}
        style={{ width: '100%' }}
      />
    </AdminLayout>
  );
};


export default ProductListPage;
