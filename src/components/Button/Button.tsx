/* eslint-disable prettier/prettier */
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isLoading?: boolean
  isDisable?: boolean
  className?: string
  classNameWrap?: string
}

export default function Button({
  classNameWrap = 'mt-3',
  className = 'flex items-center justify-center gap-3 w-full text-center py-3 px-2 uppercase bg-orange text-white text-sm hover:opacity-90',
  children,
  isLoading,
  isDisable,
  ...rest
}: Props) {
  return (
    <div className={classNameWrap}>
      <button className={className} disabled={isDisable} {...rest}>
        {isLoading && (
          <div className='h-5 w-5 rounded-full border-t-4 border-b-4 border-slate-50 animate-spin' />
        )}
        <span>{children}</span>
      </button>
    </div>
  )
}
