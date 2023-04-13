import React, { MouseEventHandler } from 'react'
import Styles from './submit-button-styles.scss'

type Props = {
  title: string
  disabled: boolean
  className?: string
  onClick?: MouseEventHandler
}

const SubmitButton: React.FC<Props> = ({ title, disabled, onClick, className = '' }: Props) => {
  return (
    <button
      disabled={disabled}
      className={`${Styles.submit} ${className}`}
      type="submit"
      onClick={onClick}
      data-testid="submit"
    >{title}</button>
  )
}

export default SubmitButton
