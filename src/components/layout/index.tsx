import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {

  const {
    children,
  } = props

  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  )
}