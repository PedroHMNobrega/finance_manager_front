import React from 'react'
import 'jest-localstorage-mock'
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'
import { AuthenticationSpy, renderWithHistory, ValidationStub } from '@/tests/presentation/mocks'
import { InvalidCredentialsError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { clickButton, populateField } from '@/tests/presentation/helpers/form-helper'

type SutTypes = {
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
  const Page: React.FC = () => (
    <Login validation={validationStub} authentication={authenticationSpy} />
  )

  renderWithHistory({
    Page,
    history,
    account: null
  })

  return {
    authenticationSpy
  }
}

type ValidSubmitTypes = {
  emailInput: HTMLInputElement
  passwordInput: HTMLInputElement
  form: HTMLFormElement
}

const simulateValidSubmit = async (email = 'any-email', password = 'any-password'): Promise<ValidSubmitTypes> => {
  const emailInput = await populateField('email', email)

  const passwordInput = await populateField('password', password)

  const form = screen.getByTestId('form') as HTMLFormElement
  await act(() => {
    fireEvent.submit(form)
  })

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
    makeSut({ validationError })

    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show email error if validation fails', async () => {
    const validationError = 'any-error'
    makeSut({ validationError })

    await populateField('email', 'wrong-email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if validation fails', async () => {
    const validationError = 'any-error'
    makeSut({ validationError })

    await populateField('password', 'wrong-password')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if validation succeeds', async () => {
    makeSut()
    await populateField('email', 'any-email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should show valid password state if validation succeeds', async () => {
    makeSut()
    await populateField('password', 'any-password')
    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('should enable submit button if form is valid', async () => {
    makeSut()

    await populateField('email', 'any-email')
    await populateField('password', 'wrong-password')

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('should show loading spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    const spinner = screen.queryByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('should call authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = 'any-email'
    const password = 'any-password'

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication if form is invalid', async () => {
    const validationError = 'any-error'
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
      throw new InvalidCredentialsError()
    })

    await simulateValidSubmit()

    const mainError = screen.queryByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeNull()
  })

  it('should add accessToken to localstorage on success', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('access-token', authenticationSpy.account.accessToken)
      expect(history.location.pathname).toBe('/')
    })
  })

  it('should go to signup page', async () => {
    makeSut()
    const signup = screen.getByTestId('signup') as HTMLButtonElement
    await clickButton(signup)

    expect(history.location.pathname).toBe('/signup')
  })
})
