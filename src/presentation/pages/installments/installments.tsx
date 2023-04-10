import React, { useEffect, useState } from 'react'
import Styles from './installments-styles.scss'
import Container from '@/presentation/components/container/container'
import InstallmentTable from '@/presentation/pages/installments/components/installment-table/installment-table'
import { useAppDispatch, useAppSelector } from '@/presentation/store/hooks'
import { loadInstallmentsRequest } from '@/presentation/store/reducers/installment/reducer'
import Message, { MessageType } from '@/presentation/components/message/message'
import { MonthPicker, WithLoading } from '@/presentation/components'

const Installments: React.FC = () => {
  const dispatch = useAppDispatch()
  const { installments, loading, error } = useAppSelector(state => state.installment)
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    dispatch(loadInstallmentsRequest({
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }))
  }, [dispatch, date])

  return (
    <Container className={Styles.container}>
      <Message message={error ? error.message : ''} type={MessageType.ERROR} />
      <div className={Styles.installments_container}>
        <div className={Styles.header}>
          <h1>Parcelas</h1>
          <MonthPicker date={date} setDate={setDate} className={Styles.month_picker} />
        </div>
        <WithLoading loading={loading} loadingClass={Styles.loading}>
          <InstallmentTable installments={installments} />
        </WithLoading>
      </div>
    </Container>
  )
}

export default Installments
