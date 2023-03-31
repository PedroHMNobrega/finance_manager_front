import React, { useState } from 'react'
import Styles from './add-category-button-styles.scss'
import { AddButton } from '@/presentation/components'

const AddCategoryButton: React.FC = () => {
  const [category, setCategory] = useState('')
  const [showCreateCategory, setShowCreateCategory] = useState(false)

  const handleAddButtonClick = (): void => {
    setShowCreateCategory(!showCreateCategory)
  }

  return (
    <div className={Styles.addCategoryButtonContainer}>
      <div className={Styles.addButtonContainer}>
        <AddButton action={handleAddButtonClick} />
      </div>
      {showCreateCategory && (
        <div className={Styles.createCategoryWrapper} data-testid="create-category-wrapper">
          <input value={category} onChange={(event) => setCategory(event.target.value)} required />
          <button>Criar</button>
        </div>
      )}
    </div>
  )
}

export default AddCategoryButton
