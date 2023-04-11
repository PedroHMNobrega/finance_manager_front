import React, { useEffect, useState } from 'react'
import Styles from './create-purchase-modal-styles.scss'
import { AddButton, Input, Modal, Select, Space, SubmitButton, WithLoading } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import CategoryModal from '@/presentation/pages/purchases/components/category-modal/category-modal'
import { useAppDispatch, useAppSelector } from '@/presentation/store/hooks'
import { SpinnerSize } from '@/presentation/components/spinner/spinner'
import Message, { MessageType } from '@/presentation/components/message/message'
import { Validation } from '@/presentation/protocols/validation'
import { Purchase } from '@/domain/models'
import { createPurchaseRequest } from '@/presentation/store/reducers/purchase/reducer'
import { useInjection } from 'inversify-react'
import { Dependencies } from '@/presentation/dependencies'

type Props = {
  setOpen: Function
}

const CreatePurchaseModal: React.FC<Props> = ({ setOpen }: Props) => {
  const validation = useInjection<Validation>(Dependencies.CreatePurchaseValidation)
  const dispatch = useAppDispatch()
  const purchaseState = useAppSelector(state => state.purchase)
  const { categories, loading, error } = useAppSelector(state => state.category)
  const [openCategoryModal, setOpenCategoryModal] = useState(false)
  const [state, setState] = useState({
    name: '',
    value: '',
    category: '',
    installmentsNumber: '',
    firstInstallmentDate: '',
    nameError: '',
    valueError: '',
    categoryError: '',
    installmentsNumberError: '',
    firstInstallmentDateError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      valueError: validation.validate('value', state.value),
      categoryError: validation.validate('category', state.category),
      installmentsNumberError: validation.validate('installmentsNumber', state.installmentsNumber),
      firstInstallmentDateError: validation.validate('firstInstallmentDate', state.firstInstallmentDate)
    })
  }, [state.name, state.category, state.value, state.installmentsNumber, state.firstInstallmentDate])

  useEffect(() => {
    if (purchaseState.success) {
      clearInput()
    }
  }, [purchaseState.success])

  const handleOpenModal = (): void => {
    setOpenCategoryModal(true)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (
      loading ||
      state.nameError ||
      state.valueError ||
      state.categoryError ||
      state.firstInstallmentDateError ||
      state.installmentsNumberError
    ) return

    const purchase: Purchase = {
      name: state.name,
      installmentsNumber: parseInt(state.installmentsNumber),
      value: parseFloat(state.value.split(' ')[1]),
      category: parseInt(state.category),
      firstInstallmentDate: state.firstInstallmentDate
    }

    dispatch(createPurchaseRequest(purchase))
  }

  const clearInput = (): void => {
    setState({
      ...state,
      name: '',
      value: '',
      category: '',
      installmentsNumber: '',
      firstInstallmentDate: ''
    })
  }

  const checkSubmitDisabled = (): boolean => {
    return purchaseState.loading || !!state.nameError || !!state.categoryError || !!state.valueError || !!state.installmentsNumberError || !!state.firstInstallmentDateError
  }

  const displayMessage = (): JSX.Element => {
    let message = ''
    let messageType = MessageType.ERROR

    if (purchaseState.success) {
      message = 'Compra criada com sucesso!'
      messageType = MessageType.SUCCESS
    } else if (purchaseState.error) {
      message = purchaseState.error.message
    } else if (error) {
      message = error.message
    }

    return (
      <Message message={message} type={messageType} />
    )
  }

  return (
    <>
      <Modal title={'Adicionar Compra'} setOpen={setOpen} name='create-purchase-modal'>
        { displayMessage() }
        <FormContext.Provider value={{ state, setState }}>
          <form className={Styles.form} data-testid="create-purchase-form" onSubmit={handleSubmit}>
            <div className={Styles.double_input_container}>
              <Input required type="text" name="name" label="Nome" />
              <Space width={10} />
              <Input required type="money" name="value" label="Valor" />
            </div>
            <div className={Styles.double_input_container}>
              <Input required type="number" name="installmentsNumber" label="Parcelas" />
              <Space width={10} />
              <Input required type="date" name="firstInstallmentDate" label="Primeira Parcela" />
            </div>
            <div className={Styles.categories_container}>
              <Select
                required
                name='category'
                placeholder='Selecionar'
                label='Categoria'
                options={categories.map(category => ({
                  value: category.id.toString(),
                  name: category.name
                }))}
              />
              <WithLoading loading={loading} size={SpinnerSize.MEDIUM}>
                <AddButton action={handleOpenModal}/>
              </WithLoading>
            </div>
            <div className={Styles.button_container}>
              <SubmitButton title={'Criar'} disabled={checkSubmitDisabled()} className={Styles.button} />
            </div>
          </form>
        </FormContext.Provider>
      </Modal>
      {openCategoryModal && (
        <CategoryModal setOpen={setOpenCategoryModal}/>
      )}
    </>
  )
}

export default CreatePurchaseModal
