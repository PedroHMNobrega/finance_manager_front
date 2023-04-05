import React from 'react'
import { makeCreatePurchaseValidation } from '@/main/factories/validation/create-purchase-validation-factory'
import { Home } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols/validation'

export type HomeDeps = {
  validation: Validation
}

export const HomeContext = React.createContext<HomeDeps | null>(null)

export const makeHome = (): JSX.Element => {
  const homeDeps: HomeDeps = {
    validation: makeCreatePurchaseValidation()
  }

  return (
    <HomeContext.Provider value={homeDeps}>
      <Home />
    </HomeContext.Provider>
  )
}
