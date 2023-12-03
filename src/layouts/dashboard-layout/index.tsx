import { Layout } from 'antd'
import React, { ReactNode } from 'react'
import { DashboardHeader, DashboardSider } from './components'
import { AuthGuard } from '@src/guards'
// import { AppProgressBar } from 'next-nprogress-bar'

type DashboardLayoutProps = {
    children: ReactNode
}

function DashboardLayout(props: DashboardLayoutProps) {
    const { children } = props;
    return (
        <Layout className='h-full'>
            {/* <AppProgressBar height="4px"
                color='#1677ff'
                options={{ showSpinner: false }}
                shallowRouting
            /> */}
            <DashboardSider />
            <Layout className='bg-white'>
                <DashboardHeader />
                <Layout.Content className='bg-transparent overflow-y-auto'>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

const WithAuth = (props: DashboardLayoutProps) => (
    <AuthGuard>
        <DashboardLayout {...props} />
    </AuthGuard>
)

export default WithAuth