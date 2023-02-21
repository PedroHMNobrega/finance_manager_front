import React from 'react'
import Styles from './not-found-styles.scss'
import { Footer, LoginHeader, PageContainer } from '@/presentation/components'
import { LinkHome } from '@/presentation/components/links'

const NotFound: React.FC = () => {
  return (
    <PageContainer>
      <LoginHeader />
      <div className={Styles.notFound}>
        <h1>
          Essa página não existe, <br />
          ir para <LinkHome className={Styles.link}>página principal</LinkHome>
        </h1>
      </div>
      <Footer />
    </PageContainer>
  )
}

export default NotFound
