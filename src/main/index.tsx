import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/main/routes/router'
import '@/presentation/styles/global.scss'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeStore } from '@/main/factories/store/redux-store-factory'

ReactDOM.render(
  <Router makeLogin={makeLogin} makeStore={makeStore}/>,
  document.getElementById('main')
)
