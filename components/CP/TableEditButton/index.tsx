import React from 'react';
import { EditOutlined } from '@ant-design/icons/lib';
import Link from 'next/link';
import s from './styles.module.scss';

interface Props {
  href: string;
}

const TableEditButton: React.FC<Props> = ({ href }) => {
  const end = href.indexOf('/');
  const dynamicPath = `${href.slice(0, end)}/[id]/edit`;

  return (
    <Link href={dynamicPath} as={href}>
      <EditOutlined className={s.icon} />
    </Link>
  );
};

export default TableEditButton;
