/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'

// components
import { QueryConfig } from '../../ProductList'
import { order as orderConstant, sort_by as sortByConstant } from '@/constants/product'
import { path } from '@/constants/path'

interface Props {
  queryConfig: QueryConfig
  pageSize: number | undefined
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortByConstant.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()

  // handler function
  const handleActive = (sortByValue: string) => {
    return sort_by === sortByValue
  }

  const handleSortByChange = (sortByValue: string) => {
    console.log(order)
    const sortByOnly = order
      ? createSearchParams(
          omit(
            {
              ...queryConfig,
              sort_by: sortByValue
            },
            ['order']
          )
        ).toString()
      : createSearchParams({
          ...queryConfig,
          sort_by: sortByValue
        }).toString()
    console.log(sortByOnly)

    navigate({
      pathname: path.home,
      search: sortByOnly
    })
  }

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const orderValue = event.target.value
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortByConstant.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': handleActive(sortByConstant.view),
              'bg-white text-black hover:bg-slate-100': !handleActive(sortByConstant.view)
            })}
            onClick={() => handleSortByChange(sortByConstant.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': handleActive(sortByConstant.createdAt),
              'bg-white text-black hover:bg-slate-100': !handleActive(sortByConstant.createdAt)
            })}
            onClick={() => handleSortByChange(sortByConstant.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': handleActive(sortByConstant.sold),
              'bg-white text-black hover:bg-slate-100': !handleActive(sortByConstant.sold)
            })}
            onClick={() => handleSortByChange(sortByConstant.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              'h-8 border-none px-4 text-left text-sm capitalize outline-none',
              {
                'bg-orange text-white hover:bg-orange/80': handleActive(sortByConstant.price),
                'bg-white text-black hover:bg-slate-100': !handleActive(sortByConstant.price)
              }
            )}
            value={order || ''}
            onChange={handleOrderChange}
          >
            <option value='' disabled className='bg-white text-black hover:bg-slate-100'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black hover:bg-slate-100'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black hover:bg-slate-100'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 items-center justify-center rounded-br-sm rounded-tr-sm bg-white px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </Link>
            )}
            {pageSize && Number(page) < pageSize ? (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 items-center justify-center rounded-br-sm rounded-tr-sm bg-white px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </Link>
            ) : (
              <button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
