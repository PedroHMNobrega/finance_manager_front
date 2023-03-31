import React, { useState } from 'react'
import Styles from './add-category-button-styles.scss'
import { AddButton } from '@/presentation/components'

const AddCategoryButton: React.FC = () => {
  const [category, setCategory] = useState('')

  return (
    <div className={Styles.addCategoryButtonContainer}>
      <AddButton action={() => {
        console.log('add-category')
      }} />
      <div className={Styles.createCategoryWrapper}>
        <input value={category} onChange={(event) => setCategory(event.target.value)} required />
        <button>Criar</button>
      </div>
    </div>
  )
}

export default AddCategoryButton
