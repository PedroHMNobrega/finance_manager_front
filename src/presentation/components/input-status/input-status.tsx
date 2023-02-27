import React from 'react'
import Styles from './input-status-styles.scss'

type Props = {
  name: string
  error: string
  className?: string
}

const InputStatus: React.FC<Props> = ({ name, error, className }: Props) => {
  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }
  const getTitle = (): string => {
    return error || 'Tudo certo!'
  }

  return (
    <span data-testid={`${name}-status`} title={getTitle()} className={`${Styles.status} ${className}`}>{getStatus()}</span>
  )
}

export default InputStatus
