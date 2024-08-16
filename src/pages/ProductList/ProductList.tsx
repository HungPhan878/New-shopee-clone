/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

// components
import AsideFilter from './Components/AsideFilter'
import Product from './Components/Product'
import SortProductList from './Components/SortProductList'
import productApi from '@/apis/product.api'
import useQueryParams from '@/hooks/useQueryParams'
import Pagination from './Components/Pagination'
import { ProductListConfig } from '@/type/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || 10,
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )
  const getProductList = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })
  const products = getProductList.data?.data?.data.products

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList
              queryConfig={queryConfig}
              pageSize={getProductList.data?.data.data.pagination.page_size}
            />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {products?.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <Pagination
              queryConfig={queryConfig}
              pageSize={getProductList.data?.data.data.pagination?.page_size as number}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
