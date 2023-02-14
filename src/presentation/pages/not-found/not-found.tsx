import React from 'react'
import Styles from './not-found-styles.scss'
import Container from '@/presentation/components/container/container'
import { Footer, LoginHeader } from '@/presentation/components'
import { LinkHome } from '@/presentation/components/links'

const NotFound: React.FC = () => {
  return (
    <Container>
      <LoginHeader />
      <div className={Styles.notFound}>
        <h1>
          Essa página não existe, <br />
          ir para <LinkHome className={Styles.link}>página principal</LinkHome>
        </h1>
      </div>
      <Footer />
    </Container>
  )
}

export default NotFound
