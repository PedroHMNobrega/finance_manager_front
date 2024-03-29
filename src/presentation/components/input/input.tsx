import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import { useInjection } from 'inversify-react'
import { FormContext } from '@/presentation/contexts'
import { InputStatus } from '@/presentation/components'
import { Dependencies } from '@/presentation/dependencies'
import { MoneyConverter } from '@/domain/usecases/conversion'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string
  type: string
  withMargin?: boolean
  className?: string
  label?: string
}

const Input: React.FC<Props> = (props: Props) => {
  const moneyConverter = useInjection<MoneyConverter>(Dependencies.MoneyConverter)
  const { withMargin, ...inputProps } = props
  const { state, setState } = useContext(FormContext)
  const error = state[`${inputProps.name}Error`]

  const getInput = (): JSX.Element => {
    switch (inputProps.type) {
      case 'money':
        return (
          <input {...inputProps} data-testid={inputProps.name} value={getMoneyValue(state[inputProps.name])} onChange={handleMoneyChange} type='text' />
        )
      default:
        return (
          <input {...inputProps} data-testid={inputProps.name} value={state[inputProps.name]} onChange={handleChange} />
        )
    }
  }

  const getMoneyValue = (value): string => {
    if (!value) return ''
    return moneyConverter.toMoney(value)
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleMoneyChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    const splitedValue = getMoneyValue(event.target.value).split(' ')
    let value
    if (splitedValue.length === 2) {
      value = splitedValue[1]
    } else {
      value = splitedValue[0]
    }

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
        <label data-testid="input-label">{inputProps.label}</label>
      )}
      <div className={`${Styles.inputWrap} ${inputProps.className}`} style={getStyle()} data-testid="input-wrap">
        {getInput()}
        <InputStatus name={inputProps.name} error={error} className={Styles.status}/>
      </div>
    </div>
  )
}

export default Input
