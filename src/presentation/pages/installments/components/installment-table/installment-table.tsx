import React from 'react'
import Styles from './installment-table-styles.scss'
import { Installment } from '@/domain/models'

type Props = {
  installments: Installment[]
}

const InstallmentTable: React.FC<Props> = ({ installments }: Props) => {
  const getRowClass = (installment): string => {
    const classes = [Styles.row]
    if (installment.paid) {
      classes.push(Styles.paid_row)
    }
    return classes.join(' ')
  }

  const renderTable = (): JSX.Element => {
    if (installments.length === 0) {
      return (
        <h2 className={Styles.no_installment_message} data-testid="no-installments">Nenhuma Parcela</h2>
      )
    } else {
      return (
        <>
          <div className={`${Styles.row} ${Styles.titles}`}>
            <h3>Compra</h3>
            <h3>Categoria</h3>
            <h3>Parcela</h3>
            <h3>Valor</h3>
            <h3>Status</h3>
          </div>
          {installments.map(installment => (
            <div key={installment.id} className={getRowClass(installment)} data-testid="installment">
              <h3>{installment.purchase.name}</h3>
              <h3>{installment.category ? installment.category : '-'}</h3>
              <h3>{`${installment.number}/${installment.purchase.installmentsNumber}`}</h3>
              <h3>R$ {installment.value_paid}</h3>
              <h3>{installment.paid ? 'Pago' : 'Pendente'}</h3>
            </div>
          ))}
        </>
      )
    }
  }

  return (
    <div className={Styles.installments} data-testid="installment-table">
      {renderTable()}
    </div>
  )
}

export default InstallmentTable
