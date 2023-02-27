import React from 'react'
import Container from '@/presentation/components/container/container'
import { HOME_LINK } from '@/presentation/util/links'
import { Subheader } from '@/presentation/components'
import { Purchases } from '@/presentation/pages'

const headerLinks = [
  {
    name: 'Compras',
    url: HOME_LINK
  }
]

const CreditCardManagement: React.FC = () => {
  return (
    <Container>
      <Subheader links={headerLinks} />
      <Purchases />
    </Container>
  )
}

export default CreditCardManagement
