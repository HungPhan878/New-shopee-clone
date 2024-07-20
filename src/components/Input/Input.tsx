/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  name?: string
  errorMessage?: string
  classNameInputWrap?: string
  classNameInput?: string
  classNameErrorMessage?: string
}

export default function Input({
  register,
  name,
  errorMessage,
  classNameInputWrap = 'mt-3',
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameErrorMessage = 'mt-1 text-red min-h-[1rem] text-sm',
  ...rest
}: Props) {
  const newRegister = register && name ? { ...register(name) } : {}
  return (
    <div className={classNameInputWrap}>
      <input className={classNameInput} {...newRegister} {...rest} />
      <div className={classNameErrorMessage}>{errorMessage}</div>
    </div>
  )
}
