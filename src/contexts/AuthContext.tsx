import { createContext, ReactNode, useState, useEffect } from 'react';
import { authApi } from '../services/authApi';
import { useRouter } from 'next/router';
import { setCookie, parseCookies } from 'nookies';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string,
  password: string,
}

type AuthContextData = {
  signIn(credentials): Promise<void>;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [ user, setUser ] = useState<User>()
  const isAuthenticated = !!user;

  useEffect(() => {
    const {'nextauth.token': token} = parseCookies()

    if (token) {
      authApi.get<{
        email: string,
        permissions: string[],
        roles: string[]
      }>('/me').then(response => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles })
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await authApi.post<{
        token: string,
        refreshToken: string,
        permissions: string[],
        roles: string[]
      }>('session', {
        email,
        password
      })

      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      authApi.defaults.headers['Authorization'] = `Barear ${token}`

      router.push('/dashboard')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value = {{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}