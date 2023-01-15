import React, { memo } from 'react'
import Styles from './login-header-styles.scss'
import Logo from '@/presentation/components/logo/logo'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo className={Styles.logo} />
      <h1>Finance Manager</h1>
    </header>
  )
}

export default memo(LoginHeader)
