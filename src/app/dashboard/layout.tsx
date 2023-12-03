'use client'

import { DashboardLayout } from '@src/layouts';

export default function DashboardRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}
