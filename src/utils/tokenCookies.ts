import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  COOKIE_EXPIRATION_TIME,
  TOKEN_COOKIE
} from '@/utils'

type CreateSessionCookiesParams = {
  token?: string
}

export function createSessionCookies(params: CreateSessionCookiesParams) {
  const { token } = params

  if (token) {
    setCookie(null, TOKEN_COOKIE, token, {
      maxAge: COOKIE_EXPIRATION_TIME,
      path: '/'
    })
  }
}

export function removeSessionCookies() {
  destroyCookie(null, TOKEN_COOKIE)
}

export function getToken() {
  const cookies = parseCookies()
  return cookies[TOKEN_COOKIE]
}
