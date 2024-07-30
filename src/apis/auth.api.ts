/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import http from '@/components/utils/http'
import { AuthResponse } from '@/type/auth.type'

export const REGISTER_URL = 'register'
export const LOGIN_URL = 'login'
export const LOGOUT_URL = 'logout'

const authApi = {
  registerApi(body: { email: string; password: string }) {
    return http.post<AuthResponse>(REGISTER_URL, body)
  },
  loginApi(body: { email: string; password: string }) {
    return http.post<AuthResponse>(LOGIN_URL, body)
  },
  logoutApi() {
    return http.post(LOGOUT_URL)
  }
}

export default authApi
