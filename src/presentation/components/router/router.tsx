import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Props = {
  makeLogin: () => React.ReactNode
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  const loginComponent = makeLogin()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={loginComponent} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
