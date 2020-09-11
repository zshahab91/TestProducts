import * as React from 'react';
import { FC } from 'react';
import s from './styles.module.scss';
import Head from 'next/head';

interface AuthLayoutProps {
  title: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Timcheh | {title}</title>
      </Head>
      <div className={s.container}>
        <div>{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
