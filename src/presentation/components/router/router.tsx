import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols/validation'

class Valid implements Validation {
  validate (fieldName: string, fieldValue: string): string {
    return null
  }
}

const Router: React.FC = () => {
  const valid = new Valid()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login validation={valid} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
