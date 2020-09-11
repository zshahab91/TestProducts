import React, { useEffect } from 'react';
import {NextPage} from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '@components/AdminLayout';



const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(()=>{
    if(localStorage.getItem('user') === null) {
      router.push('/auth/sign-in')
    }
  },[])
    return (
        <AdminLayout title="Dashboard">
            <div>
               صفحه اصلی
            </div>
        </AdminLayout>
    );
};

export default IndexPage;
