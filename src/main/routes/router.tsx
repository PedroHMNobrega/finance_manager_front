import React from 'react'
import 'reflect-metadata'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFound from '@/presentation/pages/not-found/not-found'
import { Provider } from 'react-redux'
import { Provider as DependencyProvider } from 'inversify-react'
import { PrivateRoute } from '@/main/proxies'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { container } from '@/main/dependency-injection/container'
import {
  CREDIT_CARD_MANAGEMENT_INSTALLMENTS_LINK,
  CREDIT_CARD_MANAGEMENT_LINK,
  CREDIT_CARD_MANAGEMENT_PURCHASES_LINK,
  HOME_LINK,
  LOGIN_LINK
} from '@/presentation/util/links'
import { CreditCardManagement, Home, Installments, Login, Purchases } from '@/presentation/pages'

export type RouterFactories = {
  makeStore: () => ToolkitStore
}

type Props = {
  factories: RouterFactories
}

const Router: React.FC<Props> = ({ factories }: Props) => {
  const store = factories.makeStore()

  return (
    <DependencyProvider container={container}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={HOME_LINK.full()} element={<PrivateRoute><Home /></PrivateRoute>}>
              <Route index element={<Navigate to={CREDIT_CARD_MANAGEMENT_LINK.full()} />} />
              <Route path={CREDIT_CARD_MANAGEMENT_LINK.full()} element={<CreditCardManagement />}>
                <Route index element={<Navigate to={CREDIT_CARD_MANAGEMENT_PURCHASES_LINK.full()} />} />
                <Route path={CREDIT_CARD_MANAGEMENT_PURCHASES_LINK.relative()} element={<Purchases />} />
                <Route path={CREDIT_CARD_MANAGEMENT_INSTALLMENTS_LINK.relative()} element={<Installments />} />
              </Route>
            </Route>
            <Route path={LOGIN_LINK.full()} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </DependencyProvider>
  )
}

export default Router
