/* eslint-disable import/no-unresolved */
import http from '@/components/utils/http'
import { Product, ProductList, ProductListConfig } from '@/type/product.type'
import { SuccessfulApiRes } from '@/type/util.type'

export const PRODUCT_URL = 'products'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessfulApiRes<ProductList>>(PRODUCT_URL, { params })
  },
  getProductDetail(productId: string) {
    return http.get<SuccessfulApiRes<Product>>(`${PRODUCT_URL}/${productId}`)
  }
}

export default productApi
