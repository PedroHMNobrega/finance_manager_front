import React from 'react'
import Styles from './not-found-styles.scss'
import { Footer, LoginHeader, PageContainer } from '@/presentation/components'
import { Link } from 'react-router-dom'
import { HOME_LINK } from '@/presentation/util/links'

const NotFound: React.FC = () => {
  return (
    <PageContainer>
      <LoginHeader />
      <div className={Styles.notFound}>
        <h1>
          Essa página não existe, <br />
          ir para <Link data-testid='homeLink' to={HOME_LINK.full()} className={Styles.link}>página principal</Link>
        </h1>
      </div>
      <Footer />
    </PageContainer>
  )
}

export default NotFound
