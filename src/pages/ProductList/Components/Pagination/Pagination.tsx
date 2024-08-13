/* eslint-disable prettier/prettier */
import classNames from 'classnames'
/** 
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
 */

interface Props {
  pageSize: number
  pageCurrent: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const RANGE = 2

export default function Pagination({ pageSize, pageCurrent, setPage }: Props) {
  
  const renderPagination = () => {
    let isBeforeDot = true
    let isAfterDot = true
    
    const renderDotBefore = (index: number) => {
      if (isBeforeDot) {
        isBeforeDot = false
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
            ...
          </button>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (isAfterDot) {
        isAfterDot = false
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
            ...
          </button>
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
          <button
            key={index}
            className={classNames(
              'bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border',
              {
                'border-cyan-500': pageNumber === pageCurrent,
                'border-transparent': pageNumber !== pageCurrent
              }
            )}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer  border'>
        Prev
      </button>
      {renderPagination()}
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer  border'>
        Next
      </button>
    </div>
  )
}
