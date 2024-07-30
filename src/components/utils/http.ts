/* eslint-disable import/no-unresolved */
import axios, { type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

// components
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { clearLS, getAccessTokenToLS, setAccessTokenToLS } from './auth'
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from '@/apis/auth.api'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenToLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === LOGIN_URL || url === REGISTER_URL) {
          this.accessToken = response.data.data.access_token
          setAccessTokenToLS(this.accessToken)
        } else if (url === LOGOUT_URL) {
          this.accessToken = ''
          clearLS()
        }

        return response
      },
      function (error) {
        if (!(error?.response?.status === HttpStatusCode.UnprocessableEntity)) {
          const data = error.response.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
