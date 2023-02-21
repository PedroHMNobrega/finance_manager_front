import React, { memo } from 'react'
import Styles from './main-header-styles.scss'
import { Logo } from '@/presentation/components'

const MainHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.logo_container}>
        <Logo className={Styles.logo} />
        <h1>Finance Manager</h1>
      </div>
    </header>
  )
}

export default memo(MainHeader)
