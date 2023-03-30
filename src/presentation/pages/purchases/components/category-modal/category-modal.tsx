import React, { useEffect } from 'react'
import Styles from './category-modal-styles.scss'
import { AddButton, DeleteButton, Modal } from '@/presentation/components'
import Container from '@/presentation/components/container/container'
import { useAppDispatch, useAppSelector } from '@/presentation/store/hooks'
import { deleteCategoryRequest, loadCategoryRequest } from '@/presentation/store/reducers/category/reducer'
import WithLoading from '@/presentation/components/with-loading/with-loading'

type Props = {
  setOpen: Function
}

const CategoryModal: React.FC<Props> = ({ setOpen }: Props) => {
  const dispatch = useAppDispatch()
  const { categories, loading, errorMessage } = useAppSelector(state => state.category)

  useEffect(() => {
    dispatch(loadCategoryRequest())
  }, [dispatch])

  const handleDelete = (id): void => {
    dispatch(deleteCategoryRequest(id))
  }

  const renderCategories = (): JSX.Element => {
    if (categories.length === 0) {
      return (
        <h1 className={Styles.no_categories} data-testid="no-category-message">Criar Categoria</h1>
      )
    } else {
      return (
        <div className={Styles.categories} data-testid="categories-wrapper">
          {categories.map(category => (
            <div key={category.id} className={Styles.category_container}>
              <span>{category.name}</span>
              <DeleteButton id={category.id} callback={handleDelete}/>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <Modal title={'Categorias'} setOpen={setOpen}>
      <Container className={Styles.container}>
        <WithLoading loadingClass={Styles.spinner} loading={loading}>
          <AddButton action={() => {
            console.log('add-category')
          }} />
          {renderCategories()}
        </WithLoading>
      </Container>
    </Modal>
  )
}

export default CategoryModal
