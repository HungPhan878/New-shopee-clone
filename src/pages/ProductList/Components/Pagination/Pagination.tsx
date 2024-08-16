/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'

// components
import { QueryConfig } from '../../ProductList'
import { path } from '@/constants/path'

/** thuật toán để code  phân trang
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20
1 2 ... 4 5 [6] 8 9 ... 19 20
1 2 ...13 14 [15] 16 17 ... 19 20
1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
Note: Khi code phân trang nên dùng thẻ link nha
 */

interface Props {
  pageSize: number
  queryConfig: QueryConfig
}

const RANGE = 2

export default function Pagination({ pageSize, queryConfig }: Props) {
  const pageCurrent = Number(queryConfig.page)

  const renderPagination = () => {
    let isBeforeDot = true
    let isAfterDot = true

    const renderDotBefore = (index: number) => {
      if (isBeforeDot) {
        isBeforeDot = false
        return (
          <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (isAfterDot) {
        isAfterDot = false
        return (
          <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Case 1 render dot after
        if (
          pageCurrent <= RANGE * 2 + 1 &&
          pageNumber > pageCurrent + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index)
        }
        // case 2 render dot after and before
        else if (pageCurrent > RANGE * 2 + 1 && pageCurrent < pageSize - RANGE * 2) {
          if (pageNumber > RANGE && pageNumber < pageCurrent - RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > pageCurrent + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        }
        // case 3 render dot before
        else if (
          pageCurrent >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < pageCurrent - RANGE
        ) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm hover:opacity-80',
              {
                'border-orange': pageNumber === pageCurrent,
                'border-transparent': pageNumber !== pageCurrent
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {pageCurrent > 1 ? (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (pageCurrent - 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm hover:opacity-80'
        >
          Prev
        </Link>
      ) : (
        <span className='mx-2 cursor-not-allowed rounded border bg-white px-3 py-2 opacity-80 shadow-sm'>
          Prev
        </span>
      )}

      {renderPagination()}
      {pageCurrent < pageSize ? (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (pageCurrent + 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm hover:opacity-80'
        >
          Next
        </Link>
      ) : (
        <span className='mx-2 cursor-not-allowed rounded border bg-white px-3 py-2 opacity-80 shadow-sm'>
          Next
        </span>
      )}
    </div>
  )
}
