import React from 'react'
import Styles from './installments-styles.scss'
import Container from '@/presentation/components/container/container'
import InstallmentTable from '@/presentation/pages/installments/components/installment-table/installment-table'

const Installments: React.FC = () => {
  const installments = [
    {
      id: 1,
      purchase: {
        id: 1,
        name: 'any-name',
        installmentsNumber: 10,
        value: 100,
        category: 3,
        firstInstallmentDate: '2023-02-19'
      },
      number: 1,
      value_paid: 100.00,
      date: '2023-02-20',
      paid: true,
      category: 'any-category'
    },
    {
      id: 1,
      purchase: {
        id: 1,
        name: 'any-name',
        installmentsNumber: 10,
        value: 100,
        category: 3,
        firstInstallmentDate: '2023-02-19'
      },
      number: 1,
      value_paid: 100.00,
      date: '2023-02-20',
      paid: false,
      category: 'any-category2'
    }
  ]
  // const installments = []

  return (
    <Container className={Styles.container}>
      <div className={Styles.installments_container}>
        <div className={Styles.header}>
          <h1>Parcelas</h1>
        </div>
        <InstallmentTable installments={installments} />
      </div>
    </Container>
  )
}

export default Installments
