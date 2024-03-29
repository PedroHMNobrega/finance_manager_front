import React, { useState } from 'react'
import Styles from './purchase-table-styles.scss'
import { Category, Purchase } from '@/domain/models'
import { useInjection } from 'inversify-react'
import { DateFormatter } from '@/domain/usecases/date'
import { Dependencies } from '@/presentation/dependencies'
import DeletePurchaseModal from '@/presentation/pages/purchases/components/delete-purchase-modal/delete-purchase-modal'

type Props = {
  purchases: Purchase[]
  categories: Category[]
}

const PurchaseTable: React.FC<Props> = ({ purchases, categories }: Props) => {
  const dateFormatter = useInjection<DateFormatter>(Dependencies.DateFormatter)
  const [openDeletePurchaseModal, setOpenDeletePurchaseModal] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)

  const getCategoryName = (purchase: Purchase): string => {
    const category = categories.find(c => c.id === purchase.category)
    if (!purchase.category || !category) return '-'
    return category.name
  }

  const getRowClass = (purchase: Purchase): string => {
    const classNames = [Styles.row]
    if (purchase.installmentsNumber === purchase.installments_paid) {
      classNames.push(Styles.paid)
    }
    return classNames.join(' ')
  }

  const handleSelectPurchase = (purchase): void => {
    setSelectedPurchase(purchase)
    setOpenDeletePurchaseModal(true)
  }

  const renderTable = (): JSX.Element => {
    if (purchases.length === 0) {
      return (
        <h2 className={Styles.no_purchase_message} data-testid="no-purchases">Nenhuma Compra</h2>
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
            <h3>Valor Pendente</h3>
          </div>
          {purchases.map(purchase => (
            <div
              key={purchase.id}
              className={getRowClass(purchase)}
              onClick={() => { handleSelectPurchase(purchase) }}
              data-testid="purchase"
            >
              <h3>{purchase.name}</h3>
              <h3>{getCategoryName(purchase)}</h3>
              <h3>{purchase.installments_paid}/{purchase.installmentsNumber}</h3>
              <h3>{dateFormatter.format(purchase.firstInstallmentDate)}</h3>
              <h3>R$ {purchase.value}</h3>
              <h3>R$ {(purchase.value - purchase.value_paid).toFixed(2)}</h3>
            </div>
          ))}
        </>
      )
    }
  }

  return (
    <div className={Styles.purchases} data-testid="purchase-table">
      {openDeletePurchaseModal && (
        <DeletePurchaseModal setOpen={setOpenDeletePurchaseModal} selected={selectedPurchase} setSelected={setSelectedPurchase} />
      )}
      {renderTable()}
    </div>
  )
}

export default PurchaseTable
