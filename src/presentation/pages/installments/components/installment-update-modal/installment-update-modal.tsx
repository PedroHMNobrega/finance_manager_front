import React, { useEffect, useState } from 'react'
import Styles from './installment-update-modal-styles.scss'
import { Input, Modal, SubmitButton } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Installment } from '@/domain/models'
import { useAppDispatch } from '@/presentation/store/hooks'
import { useInjection } from 'inversify-react'
import { Validation } from '@/presentation/protocols/validation'
import { Dependencies } from '@/presentation/dependencies'
import { updateInstallmentRequest } from '@/presentation/store/reducers/installment/reducer'

type Props = {
  setOpen: Function
  selected: Installment
  setSelected: Function
}

const InstallmentUpdateModal: React.FC<Props> = ({ setOpen, selected, setSelected }: Props) => {
  const validation = useInjection<Validation>(Dependencies.UpdateInstallmentValidation)
  const dispatch = useAppDispatch()

  const [state, setState] = useState({
    value: selected.value_paid.toString(),
    valueError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      valueError: validation.validate('value', state.value)
    })
  }, [state.value])

  const getSubmitButton = (): JSX.Element => {
    if (!selected.paid) {
      return (
        <SubmitButton title={'Pagar'} disabled={!!state.valueError} className={Styles.button} />
      )
    } else {
      return (
        <SubmitButton title={'Cancelar Pagamento'} disabled={!!state.valueError} className={[Styles.button, Styles.cancel_button].join(' ')} />
      )
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (state.valueError) return

    dispatch(updateInstallmentRequest({
      id: selected.id,
      body: {
        paid: !selected.paid,
        value_paid: state.value
      }
    }))

    setOpen(false)
    setSelected(null)
  }

  return (
    <Modal title={'Pagar Parcela'} setOpen={setOpen} name='update-installment-modal'>
      <div className={Styles.info_container}>
        <span data-testid="selected-installment"><b>Compra:</b> {selected.purchase.name} - {selected.number}/{selected.purchase.installmentsNumber}</span>
      </div>
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit} data-testid="update-installment-form">
          <div className={Styles.input_container}>
            <Input required type="money" name="value" label="Valor" />
          </div>
          <div className={Styles.button_container}>
            {getSubmitButton()}
          </div>
        </form>
      </FormContext.Provider>
    </Modal>
  )
}

export default InstallmentUpdateModal
