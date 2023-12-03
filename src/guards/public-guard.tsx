import { SplashLoading } from '@src/components';
import { useAuth } from '@src/hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useState, useEffect } from 'react'

type PublicGuardProps = {
  children: ReactNode
}

function PublicGuard({ children }: PublicGuardProps) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const asPath = window.location.href.split('/')[3];
  const redirectUri = searchParams.get('redirectUri');

  useEffect(() => {
    if (isAuthenticated) {
      replace(redirectUri || "/dashboard")
    } else {
      setLoading(false);
    }
  }, [replace, isAuthenticated, redirectUri, asPath, pathname])

  if (loading) {
    return <SplashLoading />
  }
  return <>{children}</>
}

export default PublicGuard