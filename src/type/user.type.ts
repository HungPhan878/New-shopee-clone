type Role = 'User' | 'Admin'

export type User = {
  _id: string
  roles: Role[]
  email: string
  createdAt: string
  updatedAt: string
  avatar?: string
  name?: string
  address?: string
  date_of_birth?: string
  phone?: string
}
