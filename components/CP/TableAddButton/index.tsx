import React from 'react';
import { PlusOutlined } from '@ant-design/icons/lib';
import { Button } from 'antd';
import Link from 'next/link';

interface Props {
  href: string;
}

const TableAddButton: React.FC<Props> = ({ href }) => {
  return (
    <Link href={href} passHref>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ margin: '20px auto' }}
      >
        ایجاد
      </Button>
    </Link>
  );
};

export default TableAddButton;
