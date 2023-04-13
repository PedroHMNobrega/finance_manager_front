import React from 'react'
import { screen } from '@testing-library/react'
import { FormContext } from '@/presentation/contexts'
import { Input } from '@/presentation/components'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { populateField } from '@/tests/presentation/helpers/form-helper'
import { MoneyConverter } from '@/domain/usecases/conversion'
import { Dependencies } from '@/presentation/dependencies'

type SutTypes = {
  renderScreen: Function
  state: object
  setState: Function
  moneyConverter: MoneyConverter
}

const makeSut = (state, InputToTest): SutTypes => {
  const setState = jest.fn()

  const Page: React.FC = () => (
    <FormContext.Provider value={{ state, setState }}>
      <InputToTest />
    </FormContext.Provider>
  )

  const { renderScreen, diContainer } = renderWithProvider({ Page })

  return {
    renderScreen,
    state,
    setState,
    moneyConverter: diContainer.get<MoneyConverter>(Dependencies.MoneyConverter)
  }
}

describe('Input Component', () => {
  it('should display label if it is passed', () => {
    const state = {
      text: '',
      textError: ''
    }

    const label = 'any-label'

    const InputToTest: React.FC = () => (
      <Input type="text" name="text" label={label} />
    )

    const { renderScreen } = makeSut(state, InputToTest)
    renderScreen()

    const labelComponent = screen.queryByTestId('input-label')
    expect(labelComponent).toBeTruthy()
    expect(labelComponent.textContent).toBe(label)
  })

  it('should not display label if it is not passed', () => {
    const state = {
      text: '',
      textError: ''
    }

    const InputToTest: React.FC = () => (
      <Input type="text" name="text" />
    )

    const { renderScreen } = makeSut(state, InputToTest)
    renderScreen()

    const labelComponent = screen.queryByTestId('input-label')
    expect(labelComponent).toBeNull()
  })

  it('should pass the className to the inputWrap if it is passed', () => {
    const state = {
      text: '',
      textError: ''
    }

    const className = 'any-class'

    const InputToTest: React.FC = () => (
      <Input type="text" name="text" className={className} />
    )

    const { renderScreen } = makeSut(state, InputToTest)
    renderScreen()

    const inputWrap = screen.queryByTestId('input-wrap')
    expect(inputWrap.className).toBe(`inputWrap ${className}`)
  })

  it('should add margin top if withMargin is true', () => {
    const state = {
      text: '',
      textError: ''
    }

    const InputToTest: React.FC = () => (
      <Input type="text" name="text" withMargin />
    )

    const { renderScreen } = makeSut(state, InputToTest)
    renderScreen()

    const inputWrap = screen.queryByTestId('input-wrap')
    expect(inputWrap.style.marginTop).toBe('16px')
  })

  it('should not add margin top if withMargin is false', () => {
    const state = {
      text: '',
      textError: ''
    }

    const InputToTest: React.FC = () => (
      <Input type="text" name="text" />
    )

    const { renderScreen } = makeSut(state, InputToTest)
    renderScreen()

    const inputWrap = screen.queryByTestId('input-wrap')
    expect(inputWrap.style.marginTop).toBe('')
  })

  it('should handle input money correctly', async () => {
    const state = {
      money: '',
      moneyError: ''
    }

    const testId = 'money'

    const InputToTest: React.FC = () => (
      <Input type="money" name={testId} />
    )

    const { renderScreen, moneyConverter, setState } = makeSut(state, InputToTest)

    const valueWithCurrency = 'R$ 5.53'
    const valueWithoutCurrency = '5.53'
    const toMoney = moneyConverter.toMoney as jest.Mock
    toMoney.mockReturnValue(valueWithCurrency)

    await renderScreen()

    await populateField(testId, valueWithoutCurrency)

    expect(toMoney).toHaveBeenCalledTimes(1)
    expect(toMoney).toHaveBeenCalledWith(valueWithoutCurrency)

    expect(setState).toHaveBeenCalledWith({
      money: valueWithoutCurrency,
      moneyError: ''
    })
  })

  it('should handle other input types correctly', async () => {
    const state = {
      text: '',
      textError: ''
    }

    const testId = 'text'

    const InputToTest: React.FC = () => (
      <Input type="text" name={testId} />
    )

    const { renderScreen, setState } = makeSut(state, InputToTest)
    await renderScreen()

    const text = 'R$ 5.53'
    await populateField(testId, text)

    expect(setState).toHaveBeenCalledWith({
      text: text,
      textError: ''
    })
  })
})
