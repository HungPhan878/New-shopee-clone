/* eslint-disable prettier/prettier */
interface Props {
  rating: number
}

// logic starWidth
// n = 3,5 sao
// 1 < 3,5 w=100%
// 2 < 3,5 w=100%
// 3 < 3,5 w=100%
// 4 > 3,5 thì lấy 3,5 - 3 = 0,5 < 1, w = 0.5 * 100%

export default function ProductRating({ rating }: Props) {
  // hander function
  const handleWidth = (index: number) => {
    if (index < rating) {
      return '100%'
    } else if (index > rating && index - rating < 1) {
      const starWidth = (rating - Math.floor(rating)) * 100 + '%'
      return starWidth
    } else {
      return '0%'
    }
  }

  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative' key={index}>
            <div
              className='absolute top-0 left-0 h-full overflow-hidden'
              style={{ width: handleWidth(index + 1) }}
            >
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='w-3 h-3 fill-yellow-300 text-yellow-300'
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
            <svg
              enableBackground='new 0 0 15 15'
              viewBox='0 0 15 15'
              x={0}
              y={0}
              className='w-3 h-3 fill-current text-gray-300'
            >
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        ))}
    </div>
  )
}
