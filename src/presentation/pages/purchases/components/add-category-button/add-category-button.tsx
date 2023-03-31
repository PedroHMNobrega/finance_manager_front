import React, { useState } from 'react'
import Styles from './add-category-button-styles.scss'
import { AddButton } from '@/presentation/components'
import { useAppDispatch, useAppSelector } from '@/presentation/store/hooks'
import { createCategoryRequest } from '@/presentation/store/reducers/category/reducer'

const AddCategoryButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.category)

  const [category, setCategory] = useState('')
  const [showCreateCategory, setShowCreateCategory] = useState(false)

  const handleAddButtonClick = (): void => {
    setShowCreateCategory(!showCreateCategory)
  }

  const handleCreateButtonClick = (): void => {
    if (!loading) {
      dispatch(createCategoryRequest(category))
      setCategory('')
    }
  }

  return (
    <div className={Styles.addCategoryButtonContainer}>
      <div className={Styles.addButtonContainer}>
        <AddButton action={handleAddButtonClick} />
      </div>
      {showCreateCategory && (
        <div className={Styles.createCategoryWrapper} data-testid="create-category-wrapper">
          <input value={category} onChange={(event) => setCategory(event.target.value)} required data-testid="create-category-input" />
          <button onClick={handleCreateButtonClick} data-testid="create-category-button">Criar</button>
        </div>
      )}
    </div>
  )
}

export default AddCategoryButton
