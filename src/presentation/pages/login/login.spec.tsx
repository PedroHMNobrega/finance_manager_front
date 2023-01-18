import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './login'
import { ValidationSpy } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  errorMessage: string
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const errorMessage = 'any-error'
  validationSpy.errorMessage = errorMessage
  const sut = render(<Login validation={validationSpy}/>)
  return {
    sut,
    validationSpy,
    errorMessage
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const { sut, errorMessage } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show email error if validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = 'any-message'
    validationSpy.errorMessage = errorMessage
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'wrong-email' } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = 'any-message'
    validationSpy.errorMessage = errorMessage
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'wrong-password' } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if validation succeeds', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any-email' } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should show valid password state if validation succeeds', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any-password' } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
