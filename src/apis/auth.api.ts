/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import http from '@/components/utils/http'
import { AuthResponse } from '@/type/auth.type'

const REGISTER_URL = 'register'
const LOGIN_URL = 'login'

const authApi = {
  registerApi(body: { email: string; password: string }) {
    return http.post<AuthResponse>(REGISTER_URL, body)
  },
  loginApi(body: { email: string; password: string }) {
    return http.post<AuthResponse>(LOGIN_URL, body)
  }
}

export default authApi
