import React from 'react'
import Container from '@/presentation/components/container/container'
import { CREDIT_CARD_MANAGEMENT_INSTALLMENTS_LINK, HOME_LINK } from '@/presentation/util/links'
import { Subheader } from '@/presentation/components'
import { Outlet } from 'react-router-dom'

const headerLinks = [
  {
    name: 'Compras',
    url: HOME_LINK
  },
  {
    name: 'Parcelas',
    url: CREDIT_CARD_MANAGEMENT_INSTALLMENTS_LINK
  }
]

const CreditCardManagement: React.FC = () => {
  return (
    <Container>
      <Subheader links={headerLinks} />
      <Outlet />
    </Container>
  )
}

export default CreditCardManagement
