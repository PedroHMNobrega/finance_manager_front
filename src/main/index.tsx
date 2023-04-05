import React from 'react'
import ReactDOM from 'react-dom'
import Router, { RouterFactories } from '@/main/routes/router'
import '@/presentation/styles/global.scss'
import { makeStore } from '@/main/factories/store/redux-store-factory'
import { makeHome, makeLogin } from '@/main/factories/pages'

const factories: RouterFactories = {
  makeHome: makeHome,
  makeLogin: makeLogin,
  makeStore: makeStore
}

ReactDOM.render(
  <Router factories={factories} />,
  document.getElementById('main')
)
