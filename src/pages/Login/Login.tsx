/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// components
import { schema, schemaType } from '@/components/utils/rules'

const loginSchema = schema.pick(['email', 'password'])
type FormData = Pick<schemaType, 'email' | 'password'>
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // handler function
  const onSubmit = handleSubmit(
    (data: FormData) => {
      console.log(data)
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
            <form
              className='p-10 rounded bg-white shadow-sm  min-h-[494px]'
              noValidate
              onSubmit={onSubmit}
            >
              <div className='text-2xl'>Đăng Nhập</div>
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
                <button className='w-full text-center py-3 px-2 uppercase bg-orange text-white text-sm hover:opacity-90'>
                  Đăng nhập
                </button>
              </div>
              <div className='mt-2 flex justify-between'>
                <Link to='#' className='capitalize text-[12px] text-blue'>
                  Quên mật khẩu
                </Link>

                <Link to='#' className='capitalize text-[12px] text-blue'>
                  Đăng Nhập Với SMS
                </Link>
              </div>
              <div className='flex items-center justify-center mt-12'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-orange ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
