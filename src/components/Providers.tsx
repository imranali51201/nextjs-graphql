'use client'
import React, { ReactNode } from 'react'
import { GraphqlProvider } from '@src/services';
import { AuthProvider } from '@src/contexts';
import { ConfigProvider } from 'antd';

type ProvidersProps = {
    children: ReactNode
}
function Providers(props: ProvidersProps) {
    const { children } = props
    return (
        <ConfigProvider componentSize='large' theme={{ token: { borderRadius: 5 } }}>
            <GraphqlProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </GraphqlProvider>
        </ConfigProvider>
    )
}

export default Providers