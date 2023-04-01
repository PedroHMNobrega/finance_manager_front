import React, { useState } from 'react'
import Styles from './create-purchase-modal-styles.scss'
import { AddButton, Input, Modal, Select, Space, SubmitButton } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import CategoryModal from '@/presentation/pages/purchases/components/category-modal/category-modal'

type Props = {
  setOpen: Function
}

const CreatePurchaseModal: React.FC<Props> = ({ setOpen }: Props) => {
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

  const handleOpenModal = (): void => {
    setOpenCategoryModal(true)
  }

  return (
    <>
      <Modal title={'Adicionar Compra'} setOpen={setOpen}>
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
              <Select required name='category' placeholder='Selecionar' label='Categoria' options={[
                {
                  value: '1',
                  name: 'Tech'
                },
                {
                  value: '2',
                  name: 'Compras'
                }
              ]}/>
              <AddButton action={handleOpenModal}/>
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
