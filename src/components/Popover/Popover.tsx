/* eslint-disable prettier/prettier */
import { ElementType, useRef, useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useInteractions,
  useHover,
  useDismiss,
  useRole,
  useFocus,
  FloatingPortal,
  safePolygon,
  arrow,
  FloatingArrow,
  Placement
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderProps: React.ReactNode
  as?: ElementType
  className?: string
  offsetValue?: number
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  renderProps,
  as: Element = 'div',
  className = 'flex items-center py-1 hover:text-gray-300 cursor-pointer',
  initialOpen,
  offsetValue = -1,
  placement = 'bottom-end'
}: Props) {
  // Dùng để đóng mở popover
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<SVGSVGElement>(null)
  // tham chiếu đến div nhấn vào để đóng mở popover
  const data = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(offsetValue),
      flip(),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement
  })

  const { refs, floatingStyles, context } = data

  // tạo các hành động cho element
  const hover = useHover(context, {
    move: false,
    // Cho vào để khi hover khỏi element vẫn chạm vào được form floating
    handleClose: safePolygon()
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    // If your reference element has its own label (text).
    role: 'tooltip'
  })
  // tạo biến tương tác với element
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])
  // ngay mai neu con song hay cho arrow vao de kiem tra thu nha

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                transformOrigin: `${data.middlewareData.arrow?.x}px top`,
                ...floatingStyles
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className='border divide-solid rounded-md bg-white'
                style={{
                  borderColor: 'rgba(0, 0, 0, 0.09)',
                  boxShadow: `0 0.0625rem 3.125rem 0 rgba(0, 0, 0, 0.2)`
                }}
              >
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  height={8}
                  width={22}
                  fill='white'
                  style={{ transform: 'translateY(-1px)' }}
                />
                {renderProps}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
