import React from 'react'
import Styles from './month-picker-styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

type Props = {
  date: Date
  setDate: Function
  className?: string
}

const MonthPicker: React.FC<Props> = ({ date, setDate, className }: Props) => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  const monthIdx = date.getMonth()
  const year = date.getFullYear()

  const handleLeftClick = (event): void => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)))
  }

  const handleRightClick = (): void => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)))
  }

  return (
    <div className={[Styles.container, className].join(' ')}>
      <FontAwesomeIcon icon={faAngleLeft} className={Styles.icon} onClick={handleLeftClick} data-testid='arrow-left' />
      <h1 data-testid="date-description">{months[monthIdx]} de {year}</h1>
      <FontAwesomeIcon icon={faAngleRight} className={Styles.icon} onClick={handleRightClick} data-testid='arrow-right' />
    </div>
  )
}

export default MonthPicker
