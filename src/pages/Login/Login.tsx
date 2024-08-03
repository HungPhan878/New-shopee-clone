/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

// components
import { schema, schemaType } from '@/components/utils/rules'
import Input from '@/components/Input'
import authApi from '@/apis/auth.api'
import { isUnprocessableEntityError } from '@/components/utils/utils'
import { ErrorApiRes } from '@/type/util.type'
import { useContext } from 'react'
import { Context } from '@/contexts/app.context'
import Button from '@/components/Button'
import { path } from '@/constants/path'

const loginSchema = schema.pick(['email', 'password'])
type FormData = Pick<schemaType, 'email' | 'password'>

export default function Login() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(Context)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginApi(body)
  })

  // handler function
  const onSubmit = handleSubmit((data: FormData) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isUnprocessableEntityError<ErrorApiRes<FormData>>(error)) {
          const errors = error.response?.data.data
          if (errors) {
            Object.keys(errors).forEach((error) => {
              setError(error as keyof FormData, {
                type: 'Server',
                message: errors[error as keyof FormData]
              })
            })
          }
        }
      }
    })
  })

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

              <Input
                type='email'
                name='email'
                classNameInputWrap='mt-8'
                register={register}
                placeholder='Email'
                errorMessage={errors.email?.message}
              />

              <Input
                type='password'
                name='password'
                register={register}
                placeholder='Mật Khẩu'
                errorMessage={errors.password?.message}
              />

              <Button
                type='submit'
                isLoading={loginMutation.isPending}
                isDisable={loginMutation.isPending}
              >
                Đăng Nhập
              </Button>

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
                <Link className='text-orange ml-1' to={path.register}>
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
