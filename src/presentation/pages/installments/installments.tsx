import React, { useEffect } from 'react'
import Styles from './installments-styles.scss'
import Container from '@/presentation/components/container/container'
import InstallmentTable from '@/presentation/pages/installments/components/installment-table/installment-table'
import { useAppDispatch, useAppSelector } from '@/presentation/store/hooks'
import { loadInstallmentsRequest } from '@/presentation/store/reducers/installment/reducer'
import Message, { MessageType } from '@/presentation/components/message/message'
import { WithLoading } from '@/presentation/components'

const Installments: React.FC = () => {
  const dispatch = useAppDispatch()
  const { installments, loading, error } = useAppSelector(state => state.installment)
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()

  useEffect(() => {
    dispatch(loadInstallmentsRequest({
      month: month,
      year: year
    }))
  }, [dispatch])

  return (
    <Container className={Styles.container}>
      <Message message={error ? error.message : ''} type={MessageType.ERROR} />
      <div className={Styles.installments_container}>
        <div className={Styles.header}>
          <h1>Parcelas</h1>
        </div>
        <WithLoading loading={loading} loadingClass={Styles.loading}>
          <InstallmentTable installments={installments} />
        </WithLoading>
      </div>
    </Container>
  )
}

export default Installments
