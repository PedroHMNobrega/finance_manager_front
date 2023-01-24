import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '@/presentation/pages/not-found/not-found'

type Props = {
  makeLogin: () => React.ReactNode
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  const loginComponent = makeLogin()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={loginComponent} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
