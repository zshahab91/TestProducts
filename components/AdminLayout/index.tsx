import React from 'react';
import { Layout, Menu } from 'antd';
import logo from 'public/static/images/logo.svg';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import {
  DashboardOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import s from './styles.module.scss';
import Head from 'next/head';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  hasFooter?: boolean;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
}) => {
  const router: NextRouter = useRouter();
  const { asPath } = router;

  return (
    <>
      <Head>
        <title>پروژه تست | {title}</title>
      </Head>
      <Layout className={s.root}>
        <Sider
          defaultCollapsed={true}
          collapsedWidth={80}
          className={s.aside}
          collapsible
        >
          <img src={logo} alt="" className={s.logo} />
          <Menu
            theme="dark"
            defaultSelectedKeys={[`/${asPath.split('/')[1]}`]}
            mode="inline"
          >
            <Menu.Item key="/" icon={<DashboardOutlined />}>
              <Link href="/">
                <a>داشبورد</a>
              </Link>
            </Menu.Item>

            <Menu.Item key="/categories" icon={<UnorderedListOutlined />}>
              <Link href="/categories">
                <a>دسته بندی ها</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/products" icon={<UnorderedListOutlined />}>
              <Link href="/products">
                <a>محصولات</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={s.content}>
          <Header className={s.header}>
            <span className={s.title}>داشبورد شما</span>
            <div>
              خروج
              <LogoutOutlined
                className={s.icon}
                onClick={() => {localStorage.clear(); router.push('/auth/sig-in')}}
              />
            </div>
          </Header>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
