/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-as-default-member */
import axios, { AxiosError } from 'axios'

// components
import HttpStatusCode from '@/constants/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return isAxiosError(error) && error?.response?.status === HttpStatusCode.UnprocessableEntity
}
//Note: AxiosError<Data> sẽ truyền vào data trong res err của axios
