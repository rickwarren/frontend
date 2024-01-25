import { AxiosError } from 'axios'
import { createContext } from 'react'

export type User = {
  id: string
  userModel: any
  permissions: string[]
  roles: string[]
}

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = {
  firstName: string,
  lastName: string,
  email: string
  password: string
}

export type AuthContextData = {
  user?: User
  isAuthenticated: boolean
  loadingUserData: boolean
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
  signUp: (credentials: SignUpCredentials) => Promise<void | AxiosError>
}

const AuthContext = createContext({} as AuthContextData)

export default AuthContext
