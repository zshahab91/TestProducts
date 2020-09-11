import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Store } from 'rc-field-form/es/interface';


interface FormProps {
  onFinish: (values: Store) => Promise<void>;
  form: FormInstance;
  loading: boolean;
}

const CategoryForm: React.FC<FormProps> = (props) => {
  const { onFinish, form, loading } = props;
  // form layout
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  // form layout
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
       <Form.Item name="code" label="کد" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="نام" rules={[{ required: true }]}>
        <Input />
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

export default CategoryForm;
