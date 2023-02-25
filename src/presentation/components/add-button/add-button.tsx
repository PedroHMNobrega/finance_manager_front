import React, { MouseEventHandler } from 'react'
import Styles from './add-button-styles.scss'

type Props = {
  action: Function
}

const AddButton: React.FC<Props> = ({ action }: Props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    action()
  }

  return (
    <button className={Styles.button} onClick={handleClick}>
      <span className={Styles.add_symbol}>+</span>
    </button>
  )
}

export default AddButton
