import React, { useEffect } from 'react'
import Styles from './category-modal-styles.scss'
import { DeleteButton, Modal } from '@/presentation/components'
import Container from '@/presentation/components/container/container'
import { useAppDispatch, useAppSelector } from '@/presentation/store/hooks'
import { deleteCategoryRequest, loadCategoryRequest } from '@/presentation/store/reducers/category/reducer'
import WithLoading from '@/presentation/components/with-loading/with-loading'
import Message, { MessageType } from '@/presentation/components/message/message'
import AddCategoryButton from '@/presentation/pages/purchases/components/add-category-button/add-category-button'

type Props = {
  setOpen: Function
}

const CategoryModal: React.FC<Props> = ({ setOpen }: Props) => {
  const dispatch = useAppDispatch()
  const { categories, loading, error, type, loadingId } = useAppSelector(state => state.category)

  useEffect(() => {
    dispatch(loadCategoryRequest())
  }, [dispatch])

  const handleDelete = (id): void => {
    if (!loading) {
      dispatch(deleteCategoryRequest(id))
    }
  }

  const render = (): JSX.Element => {
    if (error && type === 'load') {
      return (
        <h1 className={Styles.title_message} data-testid="load-error-message">Ocorreu um Erro!<br/>Tente Novamente</h1>
      )
    } else {
      return (
        <>
          <Message message={error ? error.message : ''} type={MessageType.ERROR} />
          <AddCategoryButton />
          {renderCategories()}
        </>
      )
    }
  }

  const renderCategories = (): JSX.Element => {
    if (categories.length === 0) {
      return (
        <h1 className={Styles.title_message} data-testid="no-category-message">Criar Categoria</h1>
      )
    } else {
      return (
        <div className={Styles.categories} data-testid="categories-wrapper">
          {categories.map(category => (
            <div key={category.id} className={Styles.category_container}>
              <span>{category.name}</span>
              <DeleteButton id={category.id} callback={handleDelete} loading={loading && loadingId === category.id}/>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <Modal title={'Categorias'} setOpen={setOpen}>
      <Container className={Styles.container}>
        <WithLoading loadingClass={Styles.spinner} loading={loading && type === 'load'}>
          {render()}
        </WithLoading>
      </Container>
    </Modal>
  )
}

export default CategoryModal
