import React from 'react'
import Styles from './purchases-styles.scss'
import Container from '@/presentation/components/container/container'
import { Purchase } from '@/domain/models'
import PurchaseTable from '@/presentation/pages/purchases/components/purchase-table/purchase-table'
import { AddButton, Modal } from '@/presentation/components'
import CreatePurchaseModal from '@/presentation/pages/purchases/components/create-purchase-modal/create-purchase-modal'
import CategoryModal from '@/presentation/pages/purchases/components/category-modal/category-modal'

const Purchases: React.FC = () => {
  const purchases: Purchase[] = [
    {
      id: 1,
      name: 'Apple Watch',
      category: 1,
      installmentsNumber: 2,
      firstInstallmentDate: '2023-02-12',
      value: 3000.99
    },
    {
      id: 2,
      name: 'Iphone',
      category: 1,
      installmentsNumber: 10,
      firstInstallmentDate: '2022-02-12',
      value: 7999.99
    }
  ]
  // const purchases = []

  const openAddPurchaseModal = (): void => {
    console.log('Modal')
  }

  return (
    <Container className={Styles.container}>
      <CreatePurchaseModal />
      <CategoryModal />
      <div className={Styles.purchases_container}>
        <div className={Styles.header}>
          <h1>Compras</h1>
          <AddButton action={openAddPurchaseModal}/>
        </div>
        <PurchaseTable purchases={purchases} />
      </div>
    </Container>
  )
}

export default Purchases
