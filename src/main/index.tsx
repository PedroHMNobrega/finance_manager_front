import React from 'react'
import ReactDOM from 'react-dom'
import Router, { RouterFactories } from '@/main/routes/router'
import '@/presentation/styles/global.scss'
import { makeStore } from '@/main/factories/store/redux-store-factory'

const factories: RouterFactories = {
  makeStore: makeStore
}

ReactDOM.render(
  <Router factories={factories} />,
  document.getElementById('main')
)
