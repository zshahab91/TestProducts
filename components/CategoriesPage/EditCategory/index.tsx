import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Form, message } from 'antd';
import { Store } from 'rc-field-form/es/interface';
import CategoryForm from '@components/CategoriesPage/Form';
import Category from '@entities/category';
import { useRouter } from 'next/router';
import BreadcrumbPage from '@components/Breadcrumb';
import { IValidationError } from '@entities/validation.error';
import slugify from 'slugify';
import FormAlignment from "@components/CP/FormAlignment";

const Edit: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [titlePage, setTitlePage] = useState('');

  useEffect(() => {
    (async () => {
      if (id ) {
        const list = localStorage.getItem('categories') !== null ? localStorage.getItem('categories') : [];
        //@ts-ignore   
        const data = list.length !== 0 && JSON.parse(list).filter(item=>item.id === id)[0];
        const {name, code} = data;
        setTitlePage(name);
        form.setFieldsValue({ name, code });
        
      }
    })();
  }, [id]);

  const onFinish = useCallback(
    async (values: Store): Promise<void> => {
      setLoading(true);
     

      try {
        //@ts-ignore
        const list = localStorage.getItem('categories') !== null ? JSON.parse(localStorage.getItem('categories'))  : [];
        //@ts-ignore
        const dataOld = list.length !== 0 && list.filter(item=>item.id === id)[0];

        const dto: Category = {
          //@ts-ignore
          id: id,
          name: values.name,
          code: slugify(values.code)
        };
       //@ts-ignore
       list[list.indexOf(dataOld)] = dto;
       //@ts-ignore
       localStorage.setItem('categories', JSON.stringify(list))
        message.success('Edited successfully.');
        setLoading(false)
        setTimeout(() => {
          router.push(`/categories`);
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
          { name: 'دسته بندی', route: '/categories' },
          { name: titlePage },
        ]}
      />

      <Card
        title="تغییر دسته بندی "
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

export default Edit;
