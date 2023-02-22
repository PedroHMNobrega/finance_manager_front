import React from 'react'
import Styles from './container-styles.scss'

type Props = {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<Props> = (props: Props) => {
  const classNames = `${Styles.container} ${props.className ?? ''}`

  return (
    <div className={classNames}>
      {props.children}
    </div>
  )
}

export default Container
