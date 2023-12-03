import { SplashLoading } from '@src/components';
import { useAuth } from '@src/hooks'
import { useRouter, usePathname } from 'next/navigation';
import React, { ReactNode, useState, useEffect } from 'react'

type AuthGuardProps = {
  children: ReactNode
}

function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const { replace } = useRouter();
  const pathname = usePathname();
  const asPath = window.location.href.split('/').slice(3).join("/");

  useEffect(() => {
    if (!isAuthenticated) {
      replace(`/login?redirectUri=/${asPath}`)
    } else {
      setLoading(false);
    }
  }, [replace, isAuthenticated, asPath, pathname])

  if (loading) {
    return <SplashLoading />
  }
  return <>{children}</>
}

export default AuthGuard