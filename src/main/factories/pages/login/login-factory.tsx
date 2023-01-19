import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication-factory'
import { makeLoginValidation } from '@/main/factories/validation/login-validation-factory'

export const makeLogin = (): React.ReactNode => {
  const remoteAuthentication = makeRemoteAuthentication()
  const validationComposite = makeLoginValidation()

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
