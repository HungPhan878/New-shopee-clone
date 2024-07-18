/* eslint-disable import/no-unresolved */

// components
import Footer from '@/components/Footer'
import RegisterHeader from '@/components/RegisterHeader'

interface Props {
  children: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
