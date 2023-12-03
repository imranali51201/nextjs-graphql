import {
  DashboardOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons'
import { FaPlus } from 'react-icons/fa'
import { Layout, Menu, MenuProps, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useRef } from 'react'

function DashboardSider() {

  const menuItems: MenuProps["items"] = useMemo(() => ([
    {
      key: "dashboard",
      label: <Link href="/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />
    },
  ]), [])

  return (
    <Layout.Sider
      width={240}
      theme='light'
      className='border-r overflow-auto'
    >
      <div className='p-3 flex items-center gap-4'>
        <Image src="/images/logo.png" alt="logo" height={50} width={50} />
        <Typography.Title level={2}>Chat App</Typography.Title>
      </div>
      <Menu defaultOpenKeys={["conversations"]} mode="inline" items={menuItems} />
    </Layout.Sider>
  )
}

export default DashboardSider