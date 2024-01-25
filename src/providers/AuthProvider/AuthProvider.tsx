import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { AuthContext, SignInCredentials, User } from '../../contexts'
import { paths } from '../../router'
import { api, setAuthorizationHeader } from '../../services'
import { createSessionCookies, getToken, removeSessionCookies } from '../../utils'
import { SignUpCredentials } from '../../contexts/AuthContext/AuthContext'
import React from 'react';

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
      createSessionCookies({ token })
      setUser({ id, userModel, permissions, roles })
      setAuthorizationHeader({ request: api.defaults, token })
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  async function isUserAuthenticated(t: string) {
    try {
      const response = await api.post('http://localhost:3000/user/auth/', { token: t});
      const { id, userModel, token, permissions, roles } = response.data;
      createSessionCookies({ token })
      localStorage.setItem('user', JSON.stringify(userModel));
      setUser({ id, userModel, permissions, roles })
      setAuthorizationHeader({ request: api.defaults, token })
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  async function signUp(params: SignUpCredentials) {
    const { firstName, lastName, email, password } = params
    const payload = {
      email: email,
      password: password,
      role: 'user'
    }

    try {
      const user = await api.post('/user/register', payload)
      const profilePayload = { 
        firstName: firstName, 
        lastName: lastName, 
        ownerId: user.id
      }
      await api.post('/profile', profilePayload)
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
    const token = getToken();

    if (token) {
      setLoadingUserData(true);
      setAuthorizationHeader({ request: api.defaults, token });
      isUserAuthenticated(token);
      setLoadingUserData(false);
    }
  }, [pathname]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setLoadingUserData(true);
      setAuthorizationHeader({ request: api.defaults, token });
      isUserAuthenticated(token);
      setLoadingUserData(false);
    }
  }, []);

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
