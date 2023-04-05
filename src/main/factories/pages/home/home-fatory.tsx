import React from 'react'
import { Home } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols/validation'
import { DateFormatter } from '@/domain/usecases/date'
import { makeCreatePurchaseValidation, makeDateFormatter } from '@/main/factories'

export type HomeDeps = {
  validation: Validation
  dateFormatter: DateFormatter
}

export const HomeContext = React.createContext<HomeDeps | null>(null)

export const makeHome = (): JSX.Element => {
  const homeDeps: HomeDeps = {
    validation: makeCreatePurchaseValidation(),
    dateFormatter: makeDateFormatter()
  }

  return (
    <HomeContext.Provider value={homeDeps}>
      <Home />
    </HomeContext.Provider>
  )
}
