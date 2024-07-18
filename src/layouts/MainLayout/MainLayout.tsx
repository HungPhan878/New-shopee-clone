/* eslint-disable import/no-unresolved */

// components
import Footer from '@/components/Footer'
import Header from '@/components/Header'

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
