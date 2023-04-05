import React, { useEffect, useState } from 'react'
import Styles from './purchases-styles.scss'
import Container from '@/presentation/components/container/container'
import PurchaseTable from '@/presentation/pages/purchases/components/purchase-table/purchase-table'
import { AddButton, WithLoading } from '@/presentation/components'
import CreatePurchaseModal from '@/presentation/pages/purchases/components/create-purchase-modal/create-purchase-modal'
import { useAppDispatch, useAppSelector } from '@/presentation/store/hooks'
import { loadPurchaseRequest } from '@/presentation/store/reducers/purchase/reducer'
import Message, { MessageType } from '../../components/message/message'

const Purchases: React.FC = () => {
  const dispatch = useAppDispatch()
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false)
  const { purchases, loading, error } = useAppSelector(state => state.purchase)

  useEffect(() => {
    dispatch(loadPurchaseRequest())
  }, [dispatch])

  const handleOpenModal = (): void => {
    setOpenPurchaseModal(true)
  }

  return (
    <Container className={Styles.container}>
      {openPurchaseModal && (
        <CreatePurchaseModal setOpen={setOpenPurchaseModal}/>
      )}
      <div className={Styles.purchases_container}>
        <Message message={error ? error.message : ''} type={MessageType.ERROR} />
        <div className={Styles.header}>
          <h1>Compras</h1>
          <AddButton action={handleOpenModal}/>
        </div>
        <WithLoading loading={loading} loadingClass={Styles.loading}>
          <PurchaseTable purchases={purchases} />
        </WithLoading>
      </div>
    </Container>
  )
}

export default Purchases
