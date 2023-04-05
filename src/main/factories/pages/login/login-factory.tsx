import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases/remote-authentication-factory'
import { makeLoginValidation } from '@/main/factories/validation/login-validation-factory'

export const makeLogin = (): JSX.Element => {
  const remoteAuthentication = makeRemoteAuthentication()
  const validationComposite = makeLoginValidation()

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
