import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader, PageContainer, SubmitButton } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/presentation/store/hooks'
import { setUser } from '@/presentation/store/reducers/user-reducer'
import Container from '@/presentation/components/container/container'

type Props = {
  validation?: Validation
  authentication?: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.passwordError || state.emailError) return

      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({ email: state.email, password: state.password })
      dispatch(setUser(account.accessToken))
      navigate('/', { replace: true })
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <PageContainer>
      <LoginHeader />
      <Container>
        <FormContext.Provider value={{ state, setState }}>
          <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Input type="email" name="email" placeholder="Digite seu e-mail" margin />
            <Input type="password" name="password" placeholder="Digite sua senha" margin />
            <SubmitButton title={'Entrar'} disabled={!!state.emailError || !!state.passwordError} />
            <Link to='/signup' data-testid='signup' className={Styles.link}>Criar conta</Link>
            <FormStatus />
          </form>
        </FormContext.Provider>
      </Container>
      <Footer />
    </PageContainer>
  )
}

export default Login
