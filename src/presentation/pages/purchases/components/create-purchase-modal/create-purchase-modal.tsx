import React, { useEffect, useState } from 'react'
import Styles from './create-purchase-modal-styles.scss'
import { AddButton, Input, Modal, Select, Space, SubmitButton, WithLoading } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import CategoryModal from '@/presentation/pages/purchases/components/category-modal/category-modal'
import { useAppDispatch, useAppSelector } from '@/presentation/store/hooks'
import { loadCategoryRequest } from '@/presentation/store/reducers/category/reducer'
import { SpinnerSize } from '@/presentation/components/spinner/spinner'
import Message, { MessageType } from '@/presentation/components/message/message'

type Props = {
  setOpen: Function
}

const CreatePurchaseModal: React.FC<Props> = ({ setOpen }: Props) => {
  const dispatch = useAppDispatch()
  const { categories, loading, error } = useAppSelector(state => state.category)
  const [openCategoryModal, setOpenCategoryModal] = useState(false)
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    value: '',
    category: '',
    installmentsNumber: '',
    firstInstallmentDate: '',
    mainError: ''
  })

  useEffect(() => {
    dispatch(loadCategoryRequest())
  }, [dispatch])

  const handleOpenModal = (): void => {
    setOpenCategoryModal(true)
  }

  return (
    <>
      <Modal title={'Adicionar Compra'} setOpen={setOpen}>
        <Message message={error ? error.message : ''} type={MessageType.ERROR} />
        <FormContext.Provider value={{ state, setState }}>
          <form className={Styles.form}>
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
              <SubmitButton title={'Criar'} disabled={false} className={Styles.button} />
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
