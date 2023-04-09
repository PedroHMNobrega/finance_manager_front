import React from 'react'
import 'reflect-metadata'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFound from '@/presentation/pages/not-found/not-found'
import { Provider } from 'react-redux'
import { Provider as DependencyProvider } from 'inversify-react'
import { PrivateRoute } from '@/main/proxies'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { container } from '@/main/dependency-injection/container'
import { CREDIT_CARD_MANAGEMENT_LINK, HOME_LINK, LOGIN_LINK } from '@/presentation/util/links'
import { CreditCardManagement, Home, Login, Purchases } from '@/presentation/pages'

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
            <Route path={HOME_LINK} element={<PrivateRoute><Home /></PrivateRoute>}>
              <Route index element={<Navigate to={CREDIT_CARD_MANAGEMENT_LINK} />} />
              <Route path={CREDIT_CARD_MANAGEMENT_LINK} element={<CreditCardManagement />}>
                <Route index element={<Purchases />} />
              </Route>
            </Route>
            <Route path={LOGIN_LINK} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </DependencyProvider>
  )
}

export default Router
