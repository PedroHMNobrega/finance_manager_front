import React, { useState } from 'react'
import Styles from './installment-update-modal-styles.scss'
import { Input, Modal, SubmitButton } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Installment } from '@/domain/models'

type Props = {
  setOpen: Function
  selected: Installment
  setSelected: Function
}

const InstallmentUpdateModal: React.FC<Props> = ({ setOpen, selected, setSelected }: Props) => {
  const [state, setState] = useState({
    value: selected.value_paid,
    valueError: '',
    mainError: ''
  })

  return (
    <Modal title={'Pagar Parcela'} setOpen={setOpen} name='update-installment-modal'>
      <div className={Styles.info_container}>
        <span data-testid="selected-installment"><b>Compra:</b> {selected.purchase.name} - {selected.number}/{selected.purchase.installmentsNumber}</span>
      </div>
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <div className={Styles.input_container}>
            <Input required type="money" name="value" label="Valor" />
          </div>
          <div className={Styles.button_container}>
            <SubmitButton title={'Pagar'} disabled={false} className={Styles.button} />
          </div>
        </form>
      </FormContext.Provider>
    </Modal>
  )
}

export default InstallmentUpdateModal
