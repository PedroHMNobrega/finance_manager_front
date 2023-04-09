import React from 'react'
import { Footer, MainHeader, PageContainer } from '@/presentation/components'
import { Outlet } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <PageContainer>
      <MainHeader />
      <Outlet />
      <Footer />
    </PageContainer>
  )
}

export default Home
