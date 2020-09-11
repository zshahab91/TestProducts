import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Card, Form, message } from 'antd';
import { Store } from 'rc-field-form/es/interface';
import ProductForm from '@components/ProductsPage/Form';
import Product from '@entities/product';
import { useRouter } from 'next/router';
import { IValidationError } from '@entities/validation.error';
import FormAlignment from '@components/CP/FormAlignment';
import { slugify } from '@entities/slugify';

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = useCallback(async (values: Store): Promise<void> => {
    setLoading(true);
    //@ts-ignore
    const list = localStorage.getItem('products') !== null ? JSON.parse( localStorage.getItem('products')) : [];
    //@ts-ignore
    const categories = localStorage.getItem('categories') !== null ? JSON.parse( localStorage.getItem('categories')) : [];


    const dto: Product = {
      id:  '_' + Math.random().toString(36).substr(2, 9),
      name: values.name,
      code: slugify(values.code),
      price: values.price,
      count: values.count,
      category: categories.filter((category: { id: any; })=> category.id === values.category)[0]
    };
    
    try {
      //@ts-ignore
      list.push(dto);
      //@ts-ignore
      localStorage.setItem('products', JSON.stringify(list));
      message.success('محصول  جدید ذخیره شد.');
      setTimeout(() => {
        router.push(`/products`);
      }, 500);
    } catch (e) {
      const response: IValidationError = e.response?.data;
      message.error(response?.message || 'Server error!');
    }

    setLoading(false);
  }, []);

  return (
    <>
      <Card
        title="اضافه کردن محصول"
        extra={
          <Link href="/products">
            <a>مشاهده همه  </a>
          </Link>
        }
      >
        <FormAlignment>
          <ProductForm
            loading={loading}
            form={form}
            onFinish={onFinish}
          />
        </FormAlignment>
      </Card>
    </>
  );
};

export default AddProduct;
