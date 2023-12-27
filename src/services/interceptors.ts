import {
  AxiosDefaults,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import {
  getToken,
  removeSessionCookies
} from '../utils'
import { paths } from '../router'
import { api } from './api'

type FailedRequestQueue = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: FailedRequestQueue[] = []

type SetAuthorizationHeaderParams = {
  request: AxiosDefaults | AxiosRequestConfig
  token: string
}

export function setAuthorizationHeader(params: SetAuthorizationHeaderParams) {
  const { request, token } = params

  ;(request.headers as Record<string, unknown>)[
    'Authorization'
  ] = `Bearer ${token}`
}

function onRequest(config: AxiosRequestConfig) {
  const token = getToken()

  if (token) {
    setAuthorizationHeader({ request: config, token })
  }

  return config as InternalAxiosRequestConfig
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error)
}

function onResponse(response: AxiosResponse): AxiosResponse {
  return response
}

type ErrorCode = {
  code: string
}

function onResponseError(
  error: AxiosError<ErrorCode>
): Promise<AxiosError | AxiosResponse> {
  if (error?.response?.status === 401) {
    if (error.response?.data?.code === 'token.expired') {
      const originalConfig = error.config as AxiosRequestConfig

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            setAuthorizationHeader({ request: originalConfig, token })
            resolve(api(originalConfig))
          },
          onFailure: (error: AxiosError) => {
            reject(error)
          }
        })
      })
    } else {
      removeSessionCookies()
      window.location.href = paths.LOGIN_PATH
    }
  }

  return Promise.reject(error)
}

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)

  return axiosInstance
}
