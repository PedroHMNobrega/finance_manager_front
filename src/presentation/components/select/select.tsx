import React, { useContext } from 'react'
import Styles from './select-styles.scss'
import { FormContext } from '@/presentation/contexts'

type Option = {
  value: string
  name: string
}

type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  options: Option[]
  name: string
  placeholder?: string
  className?: string
}

const Select: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.FocusEvent<HTMLSelectElement>): void => {
    setState({
      ...state,
      [props.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }
  const getTitle = (): string => {
    return error || 'Tudo certo!'
  }

  return (
    <div className={Styles.select_container}>
      <select {...props} value={state[props.name]} onChange={handleChange} className={props.className}>
        {props.placeholder && (
          <option value="" disabled hidden>{props.placeholder}</option>
        )}
        {props.options.map(option => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Select
