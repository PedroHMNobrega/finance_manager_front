import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '@/presentation/pages/not-found/not-found'
import { Provider } from 'react-redux'
import { store } from '@/presentation/store/store'
import { PrivateRoute } from '@/main/proxies'
import { Home } from '@/presentation/pages'

type Props = {
  makeLogin: () => React.ReactNode
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  const loginComponent = makeLogin()

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
