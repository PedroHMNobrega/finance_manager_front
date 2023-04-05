import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import { FormContext } from '@/presentation/contexts'
import { InputStatus } from '@/presentation/components'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string
  type: string
  withMargin?: boolean
  className?: string
  label?: string
}

const Input: React.FC<Props> = (props: Props) => {
  const { withMargin, ...inputProps } = props
  const { state, setState } = useContext(FormContext)
  const error = state[`${inputProps.name}Error`]

  const getInput = (): JSX.Element => {
    switch (inputProps.type) {
      case 'money':
        return (
          <input {...inputProps} data-testid={inputProps.name} value={state[inputProps.name]} onChange={handleMoneyChange} type='text' />
        )
      default:
        return (
          <input {...inputProps} data-testid={inputProps.name} value={state[inputProps.name]} onChange={handleChange} />
        )
    }
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  // TODO: Use dependency injection with moneyConverter
  const handleMoneyChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    let chars: string[] = (event.target.value).split('')
    chars = chars.filter(char => /[0-9]/.test(char))

    while (chars[0] === '0') chars.shift()

    let value = chars.join('')

    while (value.length < 3) value = '0' + value

    value = `R$ ${value.substring(0, value.length - 2)}.${value.substring(value.length - 2)}`

    setState({
      ...state,
      [event.target.name]: value
    })
  }

  const getStyle = (): object => {
    if (withMargin) {
      return { marginTop: 16 }
    }
  }

  return (
    <div className={Styles.input_container}>
      {inputProps.label && (
        <label>{inputProps.label}</label>
      )}
      <div className={`${Styles.inputWrap} ${inputProps.className}`} style={getStyle()}>
        {getInput()}
        <InputStatus name={inputProps.name} error={error} className={Styles.status}/>
      </div>
    </div>
  )
}

export default Input
