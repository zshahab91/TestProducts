import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Space, Select } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Store } from 'rc-field-form/es/interface';
import Category from '@entities/category';

interface FormProps {
  onFinish: (values: Store) => Promise<void>;
  form: FormInstance;
  loading: boolean;
}

const ProductForm: React.FC<FormProps> = (props) => {
  const { onFinish, form, loading } = props;
  const [categories, setCategories] = useState<Category[]>();
  // form layout
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  // form layout
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };

  useEffect(() => {
    (async () => {
    
      const list =
        localStorage.getItem('categories') !== null
          ?
          //@ts-ignore
           JSON.parse(localStorage.getItem('categories')) 
          : [];
      //@ts-ignore
      setCategories(list);
    })();
  }, []);

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="code" label="کد" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="نام" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="قیمت (تومان)" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="count" label="تعداد موجودی" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="category" label="دسته بندی " rules={[{ required: true }]}>
        {categories && (
          <Select
            placeholder={'انتخاب دسته بندی'}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(val) =>  form.setFieldsValue({ category: val })}
          >
            {categories &&
              categories.map((item) => (
                <Select.Option
                  key={item.id}
                  //@ts-ignore
                  value={item.id}>
                  {
                    item.name
                  }
                </Select.Option>
              ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space size="small">
          <Button type="primary" htmlType="submit" loading={loading}>
            ذخیره
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
