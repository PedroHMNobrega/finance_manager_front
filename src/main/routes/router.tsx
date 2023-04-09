import React from 'react'
import 'reflect-metadata'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '@/presentation/pages/not-found/not-found'
import { Provider } from 'react-redux'
import { Provider as DependencyProvider } from 'inversify-react'
import { PrivateRoute } from '@/main/proxies'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { container } from '@/main/dependency-injection/container'
import { HOME_LINK, LOGIN_LINK } from '@/presentation/util/links'
import { Home, Login } from '@/presentation/pages'

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
            <Route path={HOME_LINK} element={<PrivateRoute><Home /></PrivateRoute>}></Route>
            <Route path={LOGIN_LINK} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </DependencyProvider>
  )
}

export default Router
