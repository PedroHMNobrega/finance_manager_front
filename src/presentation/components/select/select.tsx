import React, { useContext } from 'react'
import Styles from './select-styles.scss'
import { FormContext } from '@/presentation/contexts'
import { InputStatus } from '@/presentation/components'

type Option = {
  value: string
  name: string
}

type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  options: Option[]
  name: string
  placeholder?: string
  className?: string
  label?: string
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

  return (
    <div className={Styles.select_container}>
      {props.label && (
        <label>{props.label}</label>
      )}
      <div className={Styles.select_wrapper}>
        <select {...props} value={state[props.name]} onChange={handleChange} className={props.className}>
          {props.placeholder && (
            <option value="" disabled hidden>{props.placeholder}</option>
          )}
          {props.options.map(option => (
            <option key={option.value} value={option.value} data-testid="select-option">{option.name}</option>
          ))}
        </select>
        <InputStatus name={props.name} error={error} className={Styles.status}/>
      </div>
    </div>
  )
}

export default Select
