import React from 'react'
import 'jest-localstorage-mock'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'
import { AuthenticationSpy, ValidationStub } from '@/tests/presentation/mocks'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )
  return {
    sut,
    authenticationSpy
  }
}

const populateField = (sut: RenderResult, testId, value): HTMLInputElement => {
  const input = sut.getByTestId(testId) as HTMLInputElement
  fireEvent.input(input, { target: { value: value } })
  return input
}

type ValidSubmitTypes = {
  emailInput: HTMLInputElement
  passwordInput: HTMLInputElement
  form: HTMLFormElement
}

const simulateValidSubmit = (sut: RenderResult, email = 'any-email', password = 'any-password'): ValidSubmitTypes => {
  const emailInput = populateField(sut, 'email', email)

  const passwordInput = populateField(sut, 'password', password)

  const form = sut.getByTestId('form') as HTMLFormElement
  fireEvent.submit(form)

  return {
    emailInput,
    passwordInput,
    form
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  it('should start with initial state', () => {
    const validationError = 'any-error'
    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show email error if validation fails', () => {
    const validationError = 'any-error'
    const { sut } = makeSut({ validationError })

    populateField(sut, 'email', 'wrong-email')

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if validation fails', () => {
    const validationError = 'any-error'
    const { sut } = makeSut({ validationError })

    populateField(sut, 'password', 'wrong-password')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'email', 'any-email')

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'password', 'any-password')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateField(sut, 'email', 'any-email')
    populateField(sut, 'password', 'wrong-password')

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('should show loading spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.queryByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = 'any-email'
    const password = 'any-password'

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication if form is invalid', () => {
    const validationError = 'any-error'
    const { sut, authenticationSpy } = makeSut({ validationError })
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    simulateValidSubmit(sut)

    await waitFor(() => {
      const mainError = sut.queryByTestId('main-error')
      expect(mainError.textContent).toBe(error.message)

      const spinner = sut.queryByTestId('spinner')
      expect(spinner).toBeNull()
    })
  })

  it('should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
      expect(history.location.pathname).toBe('/')
    })
  })

  it('should go to signup page', () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)

    expect(history.location.pathname).toBe('/signup')
  })
})
