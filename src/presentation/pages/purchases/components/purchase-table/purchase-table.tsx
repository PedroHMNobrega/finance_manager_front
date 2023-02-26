import React from 'react'
import Styles from './purchase-table-styles.scss'
import { Purchase } from '@/domain/models'

type Props = {
  purchases: Purchase[]
}

const PurchaseTable: React.FC<Props> = ({ purchases }: Props) => {
  const renderTable = (): JSX.Element => {
    if (purchases.length === 0) {
      return (
        <h2 className={Styles.no_purchase_message}>Nenhuma Compra</h2>
      )
    } else {
      return (
        <>
          <div className={`${Styles.row} ${Styles.titles}`}>
            <h3>Nome</h3>
            <h3>Categoria</h3>
            <h3>Parcelas</h3>
            <h3>Primeira Parcela</h3>
            <h3>Valor</h3>
          </div>
          {purchases.map(purchase => (
            <div key={purchase.id} className={Styles.row}>
              <h3>{purchase.name}</h3>
              <h3>{purchase.category}</h3>
              <h3>{purchase.installmentsNumber}</h3>
              <h3>{purchase.firstInstallmentDate}</h3>
              <h3>R$ {purchase.value}</h3>
            </div>
          ))}
        </>
      )
    }
  }

  return (
    <div className={Styles.purchases}>
      {renderTable()}
    </div>
  )
}

export default PurchaseTable