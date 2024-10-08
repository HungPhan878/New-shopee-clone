export type Product = {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
    __v?: number
  }
  image: string
  createdAt: string
  updatedAt: string
}

export type ProductList = {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export type ProductListConfig = {
  page?: number | string
  limit?: number | string
  order?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: string
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
}
