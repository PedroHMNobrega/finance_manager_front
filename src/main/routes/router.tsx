import React from 'react'
import 'reflect-metadata'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '@/presentation/pages/not-found/not-found'
import { Provider } from 'react-redux'
import { Provider as DependencyProvider } from 'inversify-react'
import { PrivateRoute } from '@/main/proxies'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { container } from '@/main/dependency-injection/container'

export type RouterFactories = {
  makeLogin: () => JSX.Element
  makeHome: () => JSX.Element
  makeStore: () => ToolkitStore
}

type Props = {
  factories: RouterFactories
}

const Router: React.FC<Props> = ({ factories }: Props) => {
  const loginComponent = factories.makeLogin()
  const homeComponent = factories.makeHome()
  const store = factories.makeStore()

  return (
    <DependencyProvider container={container}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute>{homeComponent}</PrivateRoute>}></Route>
            <Route path="/login" element={loginComponent} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </DependencyProvider>
  )
}

export default Router
