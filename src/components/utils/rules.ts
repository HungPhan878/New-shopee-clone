/* eslint-disable prettier/prettier */
import * as yup from 'yup'

export const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên').max(160, 'Độ dài không vượt quá 160 ký tự'),
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .max(160, 'Độ dài không vượt quá 160 ký tự')
      .min(5, 'Độ dài không dưới 5 ký tự')
      .email('Email không hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .max(160, 'Độ dài không vượt quá 160 ký tự')
      .min(6, 'Độ dài không dưới 6 ký tự'),
    confirmPassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu')
      .max(160, 'Độ dài không vượt quá 160 ký tự')
      .min(6, 'Độ dài không dưới 6 ký tự')
      .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
  })
  .required()

export type schemaType = yup.InferType<typeof schema>
