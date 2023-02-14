import React from 'react'
import Styles from './container-styles.scss'

type Props = {
  children: React.ReactNode
}

const Container: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.container}>
      {props.children}
    </div>
  )
}

export default Container
