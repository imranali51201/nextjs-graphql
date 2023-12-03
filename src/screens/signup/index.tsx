'use client'
import { PublicGuard } from '@src/guards'
import { useAuth } from '@src/hooks'
import { Button, Divider, Form, Input, Space, Checkbox, Typography, DatePicker, InputNumber, message } from 'antd'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { SignupProps } from '@src/types'

function SignupScreen() {
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const onFinish = useCallback(async (props: SignupProps) => {
        try {
            setLoading(true)
            await signup(props)
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }, [signup])

    return (
        <div className='flex h-full'>
            <div className='flex-1 p-3'>
                <div className='bg-blue-600 rounded-md h-full'>
                </div>
            </div>
            <div className='flex-1 p-10 flex justify-center items-center'>
                <div className='w-[420px]'>
                    <div className='mb-5 text-center'>
                        <Typography.Text className='text-2xl font-bold'>Join for success ✨</Typography.Text>
                        <br />
                        <Typography.Text type='secondary'>Are you ready to take the next step towards a successful future? Look no further than!</Typography.Text>
                    </div>
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className='flex-1'
                            name="full_name"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Enter your Username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Enter your password"
                            />
                        </Form.Item>
                        <Form.Item className='mb-0'>
                            <Checkbox>Agree terms & conditions</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" block htmlType="submit">
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>OR</Divider>
                    <Space className='w-full' direction='vertical'>
                        {/* <Button
                            className='flex justify-center items-center'
                            icon={<Image src="/images/google_logo.png" alt="google-logo" width={15} height={15} />}
                            block
                        >
                            Sign In with Google
                        </Button>
                        <Button
                            className='flex justify-center items-center'
                            icon={<Image src="/images/apple_logo.png" alt="apple-logo" width={15} height={15} />}
                            block
                        >
                            Sign In with Apple
                        </Button> */}
                        <div className='flex justify-center gap-2'>
                            <Typography.Text type='secondary'>Already have an account?</Typography.Text>
                            <Link href="/login">Login</Link>
                        </div>
                    </Space>
                </div>
            </div>
        </div>
    )
}

const WithGuard = () => (
    <PublicGuard>
        <SignupScreen />
    </PublicGuard>
)

export default WithGuard