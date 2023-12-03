import { LogoutOutlined } from '@ant-design/icons'
import { useAuth } from '@src/hooks'
import { Avatar, Dropdown, Layout, MenuProps, Space, Typography } from 'antd'
import React, { useMemo } from 'react'

function DashboardHeader() {
  const { logout, user } = useAuth();

  const userDropdownItems: MenuProps["items"] = useMemo(() => ([
    {
      key: "user-details",
      disabled: true,
      label: (
        <Space direction='vertical' size={2}>
          <Typography.Text>{user?.full_name}</Typography.Text>
          <Typography.Text>{user?.email}</Typography.Text>
        </Space>
      )
    },
    { type: "divider" },
    {
      danger: true,
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: logout
    }
  ]), [logout, user])

  return (
    <Layout.Header className='flex justify-end items-center bg-transparent px-6'>
      <Space>
        <Dropdown arrow placement='bottomRight' menu={{ items: userDropdownItems, className: "w-40" }}>
          <Avatar
            size="large"
            src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
          />
        </Dropdown>
      </Space>
    </Layout.Header>
  )
}

export default DashboardHeader