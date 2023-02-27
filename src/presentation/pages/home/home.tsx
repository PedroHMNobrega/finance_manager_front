import React from 'react'
import { Footer, MainHeader, PageContainer } from '@/presentation/components'
import { CreditCardManagement } from '@/presentation/pages'

const Home: React.FC = () => {
  return (
    <PageContainer>
      <MainHeader />
      <CreditCardManagement />
      <Footer />
    </PageContainer>
  )
}

export default Home
