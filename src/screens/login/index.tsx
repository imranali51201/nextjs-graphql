'use client'
import { PublicGuard } from '@src/guards'
import { useAuth } from '@src/hooks'
import { Button, Divider, Form, Input, Space, Checkbox, Typography, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { LoginProps } from '@src/types'

function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth()

    const onFinish = useCallback(async (v: LoginProps) => {
        try {
            setLoading(true)
            await login(v)
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }, [login])

    return (
        <div className='flex h-full'>
            <div className='flex-1 p-3'>
                <div className='bg-blue-600 rounded-md h-full'>
                </div>
            </div>
            <div className='flex-1 p-10 flex justify-center items-center'>
                <div className='w-96'>
                    <div className='mb-5 text-center'>
                        <Typography.Text className='text-2xl font-bold'>Welcome Back ✨</Typography.Text>
                        <br />
                        <Typography.Text type='secondary'>The faster you fill up, The faster you get in.</Typography.Text>
                    </div>
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                    >
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
                            <div className="flex justify-between">
                                <Checkbox>Remember me</Checkbox>
                                <Link href="">Forgotten password?</Link>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type="primary" block htmlType="submit">
                                Log in
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
                            <Typography.Text type='secondary'>Don&apos;t have an account?</Typography.Text>
                            <Link href="/signup">Sign Up</Link>
                        </div>
                    </Space>
                </div>
            </div>
        </div>
    )
}

const WithGuard = () => (
    <PublicGuard>
        <LoginScreen />
    </PublicGuard>
)

export default WithGuard