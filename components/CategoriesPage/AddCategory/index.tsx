import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Card, Form, message } from 'antd';
import { Store } from 'rc-field-form/es/interface';
import CategoryForm from '@components/CategoriesPage/Form';
import Category from '@entities/category';
import { useRouter } from 'next/router';
import { IValidationError } from '@entities/validation.error';
import FormAlignment from '@components/CP/FormAlignment';
import { slugify } from '@entities/slugify';

const AddCategory: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = useCallback(async (values: Store): Promise<void> => {
    setLoading(true);
    //@ts-ignore
    const list = localStorage.getItem('categories') !== null ? JSON.parse( localStorage.getItem('categories')) : [];

    const dto: Category = {
      id:  '_' + Math.random().toString(36).substr(2, 9),
      name: values.name,
      code: slugify(values.code),
    };
    
    try {
      //@ts-ignore
      list.push(dto);
      //@ts-ignore
      localStorage.setItem('categories', JSON.stringify(list));
      message.success('دسته بندی جدید ذخیره شد.');
      setTimeout(() => {
        router.push(`/categories`);
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
        title="اضافه کردن دسته بندی"
        extra={
          <Link href="/categories">
            <a>مشاهده همه  </a>
          </Link>
        }
      >
        <FormAlignment>
          <CategoryForm
            loading={loading}
            form={form}
            onFinish={onFinish}
          />
        </FormAlignment>
      </Card>
    </>
  );
};

export default AddCategory;
