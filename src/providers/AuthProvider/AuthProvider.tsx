import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { AuthContext, SignInCredentials, User } from '@/contexts'
import { paths } from '@/router'
import { api, setAuthorizationHeader } from '@/services'
import { createSessionCookies, getToken, removeSessionCookies } from '@/utils'
import { SignUpCredentials } from '@/contexts/AuthContext/AuthContext'

type Props = {
  children: ReactNode
}

function AuthProvider(props: Props) {
  const { children } = props

  const [user, setUser] = useState<User>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const token = getToken()
  const isAuthenticated = Boolean(token)

  async function signIn(params: SignInCredentials) {
    const { email, password } = params

    try {
      const response = await api.post('/user/login', { email, password })
      const { id, token, permissions, roles, userModel } = response.data
      console.log(response.data);
      createSessionCookies({ token })
      setUser({ id, userModel, permissions, roles })
      setAuthorizationHeader({ request: api.defaults, token })
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  async function signUp(params: SignUpCredentials) {
    const { email, password } = params
    const payload = {
      email: email,
      password: password,
      role: 'user'
    }

    try {
      await api.post('/user/register', payload)
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  function signOut() {
    removeSessionCookies()
    setUser(undefined)
    setLoadingUserData(false)
    navigate(paths.LOGIN_PATH)
  }

  useEffect(() => {
    if (!token) {
      removeSessionCookies()
      setUser(undefined)
      setLoadingUserData(false)
    }
  }, [navigate, pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData() {
      setLoadingUserData(true)

      try {
        if(user?.id) {
          const response = await api.get('/user/' + user?.id)

          if (response?.data) {
            const { id, email, permissions, role } = response.data
            setUser({ id, email, permissions, role })
          }
        }
      } catch (error) {
        /**
         * an error handler can be added here
         */
      } finally {
        setLoadingUserData(false)
      }
    }

    if (token) {
      setAuthorizationHeader({ request: api.defaults, token })
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        signIn,
        signOut,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
