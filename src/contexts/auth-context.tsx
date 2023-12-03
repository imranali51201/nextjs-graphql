'use client'
import { SplashLoading } from "@src/components";
import { useGetUser, useLogin, useSignup } from "@src/graphql";
import { AuthContextType, LoginProps, SignupProps } from "@src/types";
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
    children: ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)

    const [getUser, { data: user }] = useGetUser()

    const [loginApi] = useLogin();
    const [signupApi] = useSignup();

    const checkAuth = useCallback(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(!!token)
        }
        setLoading(false)
    }, [])

    const login = useCallback(async (props: LoginProps) => {
        try {
            const { email, password } = props
            const { data } = await loginApi({ variables: { props: { email, password } } })
            if (data?.login.token) {
                localStorage.setItem("token", data?.login.token)
                checkAuth()
            }
        } catch (error) {
            throw error
        }
    }, [loginApi, checkAuth])

    const signup = useCallback(async (props: SignupProps) => {
        try {
            const { email, password, full_name } = props
            const { data } = await signupApi({ variables: { props: { email, full_name, password } } })
            if (data?.signup.token) {
                localStorage.setItem("token", data?.signup.token)
                checkAuth()
            }
        } catch (error) {
            throw error
        }
    }, [signupApi, checkAuth])

    const logout = useCallback(async () => {
        try {
            localStorage.removeItem("token")
            checkAuth()
        } catch (error) {
            throw error
        }
    }, [checkAuth])

    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    useEffect(() => {
        if (isAuthenticated) {
            getUser()
        }
    }, [getUser, isAuthenticated])

    const value: AuthContextType = useMemo(() => ({
        isAuthenticated,
        user: user?.user || null,
        login,
        signup,
        logout
    }), [
        isAuthenticated,
        user?.user,
        login,
        signup,
        logout
    ])
    return (
        <AuthContext.Provider value={value}>
            {loading ? <SplashLoading /> : children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }