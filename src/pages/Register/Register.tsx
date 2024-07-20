/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import omit from 'lodash/omit'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

// components
import { schema, schemaType } from '@/components/utils/rules'
import authApi from '@/apis/auth.api'

const registerSchema = schema.pick(['email', 'password', 'confirmPassword'])
type FormData = Pick<schemaType, 'email' | 'password' | 'confirmPassword'>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirmPassword'>) => authApi.registerApi(body)
  })

  // handler function
  const onSubmit = handleSubmit(
    async (data: FormData) => {
      await registerMutation.mutateAsync(omit(data, ['confirmPassword']), {
        onSuccess: (data) => {
          toast.success(data.data.message)
        }
      })
    },
    (error) => {
      console.log(error)
    }
  )

  return (
    <section className='bg-red'>
      <div className='container'>
        <div
          className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:pr-10'
          style={{
            backgroundImage:
              'url("https://project-shopee-clone-sass.vercel.app/assets/shopee-login-CNlhbosn.jpg")',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={onSubmit}>
              <h2 className='text-2xl'>Đăng Ký</h2>
              <div className='mt-8'>
                <input
                  type='email'
                  {...register('email')}
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-md focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 text-red min-h-[1rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  {...register('password')}
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-md focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='mt-1 text-red min-h-[1rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  {...register('confirmPassword')}
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Confirm Password'
                />
                <div className='mt-1 text-red min-h-[1rem] text-sm'>
                  {errors.confirmPassword?.message}
                </div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-3 px-2 uppercase bg-orange text-white text-sm hover:opacity-90'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-2 flex justify-end'>
                <Link to='#' className='capitalize text-[12px] text-blue'>
                  Đăng Nhập Với SMS
                </Link>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn mới biết đến shopee?</span>
                <Link className='text-orange ml-1' to='/login'>
                  Đăng Nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
