/* eslint-disable prettier/prettier */
import { User } from './user.type'
import { SuccessfulApiRes } from './util.type'

export type AuthResponse = SuccessfulApiRes<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
