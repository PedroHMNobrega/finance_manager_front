import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '@/presentation/pages/not-found/not-found'
import { Provider } from 'react-redux'
import { PrivateRoute } from '@/main/proxies'
import { Home } from '@/presentation/pages'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

type Props = {
  makeLogin: () => React.ReactNode
  makeStore: () => ToolkitStore
}

const Router: React.FC<Props> = ({ makeLogin, makeStore }: Props) => {
  const loginComponent = makeLogin()
  const store = makeStore()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route path="/login" element={loginComponent} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default Router
