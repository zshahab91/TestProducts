import React from 'react';
import { Breadcrumb } from 'antd';
import s from './styles.module.scss';

interface BreadcrumbInterface {
    route?: string,
    name: string
}

interface BreadcrumbProps {
    listLinks: BreadcrumbInterface[]
}
const BreadcrumbPage: React.FC<BreadcrumbProps> = (props) => {
  const {listLinks} = props;

  return (
   <>
    <Breadcrumb className={s.root}>
    {listLinks.map((breadcrumb,inx) => {
        return(
            <Breadcrumb.Item key={inx}>
                {breadcrumb.route ? <a href={breadcrumb.route}>{breadcrumb.name}</a> : breadcrumb.name}
            </Breadcrumb.Item>
        )
    })}
  </Breadcrumb>
   </>
  );
};

export default BreadcrumbPage;
