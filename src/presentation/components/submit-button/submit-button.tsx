import React from 'react'
import Styles from './submit-button-styles.scss'

type Props = {
  title: string
  disabled: boolean
  className?: string
}

const SubmitButton: React.FC<Props> = ({ title, disabled, className = '' }: Props) => {
  return (
    <button data-testid="submit" disabled={disabled} className={`${Styles.submit} ${className}`} type="submit" >{title}</button>
  )
}

export default SubmitButton
