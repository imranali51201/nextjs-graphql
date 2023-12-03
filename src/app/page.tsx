'use client'
import { SplashLoading } from '@src/components'
import { useAuth } from '@src/hooks'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function MainPage() {
  const { isAuthenticated } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    replace(isAuthenticated ? "/dashboard" : "/login")
  }, [isAuthenticated, replace])

  return <SplashLoading />
}

export default MainPage;