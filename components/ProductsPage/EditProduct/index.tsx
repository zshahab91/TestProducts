import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Form, message } from 'antd';
import { Store } from 'rc-field-form/es/interface';
import ProductForm from '@components/ProductsPage/Form';
import Product from '@entities/product';
import { useRouter } from 'next/router';
import BreadcrumbPage from '@components/Breadcrumb';
import { IValidationError } from '@entities/validation.error';
import slugify from 'slugify';
import FormAlignment from '@components/CP/FormAlignment';

const Edit: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [titlePage, setTitlePage] = useState('');

  useEffect(() => {
    (async () => {
      if (id) {
        const list =
          localStorage.getItem('products') !== null
            ? localStorage.getItem('products')
            : [];
        //@ts-ignore
        const product =list.length !== 0 && JSON.parse(list).filter((item) => item.id === id)[0];
        const { name, code, price, count, category } = product;
        setTitlePage(name);
        form.setFieldsValue({
          name,
          code,
          price,
          count,
          category: category.id,
        });
      }
    })();
  }, [id]);

  const onFinish = useCallback(
    async (values: Store): Promise<void> => {
      console.log("values is:", values)
      setLoading(true);
      try {
        //@ts-ignore
        const list = localStorage.getItem('products') !== null? JSON.parse(localStorage.getItem('products')): [];
        //@ts-ignore
        const dataOld = list.length !== 0 && list.filter((item) => item.id === id)[0];
          //@ts-ignore
    const categories = localStorage.getItem('categories') !== null ? JSON.parse( localStorage.getItem('categories')) : [];

        const dto: Product = {
          //@ts-ignore
          id: id,
          name: values.name,
          code: slugify(values.code),
          price: values.price,
          count: values.count,
          category:  categories.filter((category: { id: any; })=> category.id === values.category)[0]
        };
        list[list.indexOf(dataOld)] = dto;
        //@ts-ignore
        localStorage.setItem('products', JSON.stringify(list));
        message.success('Edited successfully.');
        setLoading(false);
        setTimeout(() => {
          router.push(`/products`);
        }, 500);
      } catch (e) {
        const response: IValidationError = e.response?.data;
        message.error(response?.message || 'Server error!');
      }
    },
    [id],
  );

  return (
    <>
      <BreadcrumbPage
        listLinks={[
          { name: 'Home', route: '/' },
          { name: 'محصولات', route: '/products' },
          { name: titlePage },
        ]}
      />

      <Card
        title="تغییر محصول "
        extra={
          <Link href="/products">
            <a>مشاهده همه </a>
          </Link>
        }
      >
        <FormAlignment>
          <ProductForm loading={loading} form={form} onFinish={onFinish} />
        </FormAlignment>
      </Card>
    </>
  );
};

export default Edit;
