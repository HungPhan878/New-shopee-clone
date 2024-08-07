/* eslint-disable import/no-unresolved */
import { useQuery } from '@tanstack/react-query'

// components
import AsideFilter from './Components/AsideFilter'
import Product from './Components/Product'
import SortProductList from './Components/SortProductList'
import productApi from '@/apis/product.api'
import useQueryParams from '@/hooks/useQueryParams'

export default function ProductList() {
  const queryParams = useQueryParams()
  const getProductList = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProducts(queryParams)
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
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {products?.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
