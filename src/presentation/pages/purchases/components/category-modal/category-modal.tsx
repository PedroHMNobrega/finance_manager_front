import React from 'react'
import Styles from './category-modal-styles.scss'
import { AddButton, DeleteButton, Modal } from '@/presentation/components'
import { Category } from '@/domain/models'
import Container from '@/presentation/components/container/container'

type Props = {
  setOpen: Function
}

const CategoryModal: React.FC<Props> = ({ setOpen }: Props) => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Tech'
    },
    {
      id: 2,
      name: 'Comida'
    }
  ]

  const renderCategories = (): JSX.Element => {
    if (categories.length === 0) {
      return (
        <h1 className={Styles.no_categories}>Criar Categoria</h1>
      )
    } else {
      return (
        <div className={Styles.categories}>
          {categories.map(category => (
            <div key={category.id} className={Styles.category_container}>
              <span>{category.name}</span>
              <DeleteButton id={category.id} callback={(id) => console.log(id)}/>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <Modal title={'Categorias'} setOpen={setOpen}>
      <Container className={Styles.container}>
        <AddButton action={() => {
          console.log('add-category')
        }} />
        {renderCategories()}
      </Container>
    </Modal>
  )
}

export default CategoryModal
