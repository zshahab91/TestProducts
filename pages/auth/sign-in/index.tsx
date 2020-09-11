import * as React from 'react';
import {useState} from 'react';
import AuthLayout from '@components/AuthLayout';
import {Alert, Button, Card, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";
import {Store} from "rc-field-form/es/interface";
import { useRouter } from 'next/router';


export default function SignInPage(): React.ReactNode {
    const router = useRouter();
    const [isRequesting, setIsRequesting] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(formData: Store): void {

        console.log("formData is:", formData)
        if(formData.username === 'admin' && formData.password === '123'){
            localStorage.setItem('user', JSON.stringify(formData));
            router.push('/');

        }else{
            setErrorMessage('نام کاربری یا رمز ورود اشتباه است!')
        }

    }


    return (
        <AuthLayout title="ورود">


            {errorMessage && <Alert message={errorMessage} showIcon type="error" style={{marginBottom: 15}}/>}

            <Card title="ورود" style={{width: 350}}>

                <Form onFinish={handleSubmit}>

                    <Form.Item
                        name="username"
                        rules={[{required: true, message: "نام کاربری را وارد نمایید!"}]}
                    >
                        <Input size="large" placeholder="admin" prefix={<UserOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: "رمز عبور را وارد نمایید!"}]}
                    >
                        <Input size="large" placeholder="123" prefix={<LockOutlined/>} type="password"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size="large" loading={isRequesting}
                                disabled={isRedirecting}>
                            ورود
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </AuthLayout>
    );
}
