import React from 'react';
import type {AppProps} from 'next/app';
import {ConfigProvider} from 'antd';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import 'antd/dist/antd.css';
import 'public/static/css/farsi-font.css';
import 'public/static/css/public.css';
import 'public/static/css/antd-rtl-431.css';

import {LoadingOutlined} from '@ant-design/icons';

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {

    // if (!isPageAllowed)
    //     return <LoadingOutlined />;

    return (
        <ConfigProvider direction="rtl">
            <Component {...pageProps} />
        </ConfigProvider>
    );
};

export default MyApp;
