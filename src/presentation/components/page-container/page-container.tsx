import React from 'react'
import Styles from './page-container-styles.scss'

type Props = {
  children: React.ReactNode
}

const PageContainer: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.container}>
      {props.children}
    </div>
  )
}

export default PageContainer
