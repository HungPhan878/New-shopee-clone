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

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
