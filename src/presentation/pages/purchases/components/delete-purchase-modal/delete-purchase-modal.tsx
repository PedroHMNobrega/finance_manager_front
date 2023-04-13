import React from 'react'
import Styles from './delete-purchase-modal-styles.scss'
import { Purchase } from '@/domain/models'
import { Modal, SubmitButton } from '@/presentation/components'
import { useAppDispatch } from '@/presentation/store/hooks'
import { deletePurchaseRequest } from '@/presentation/store/reducers/purchase/reducer'

type Props = {
  setOpen: Function
  selected: Purchase
  setSelected: Function
}

const DeletePurchaseModal: React.FC<Props> = ({ setOpen, selected, setSelected }: Props) => {
  const dispatch = useAppDispatch()
  const handleDelete = (): void => {
    dispatch(deletePurchaseRequest(selected.id))

    setOpen(false)
    setSelected(null)
  }

  return (
    <Modal title={'Deletar Compra'} setOpen={setOpen} name='delete-purchase-modal'>
      <div className={Styles.info_container} data-testid="selected-purchase-info">
        <span>Tem certeza que deseja deletar a compra <b>{selected.name}</b>?</span>
      </div>
      <div className={Styles.button_container}>
        <SubmitButton
          title={'Deletar'}
          disabled={false}
          className={Styles.button}
          onClick={handleDelete}
        />
      </div>
    </Modal>
  )
}

export default DeletePurchaseModal
