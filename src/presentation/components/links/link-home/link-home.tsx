import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: React.ReactNode
  className: string
}

const LinkHome: React.FC<Props> = (props: Props) => {
  return (<Link data-testid='homeLink' to='/' className={props.className}>{props.children}</Link>)
}

export default LinkHome
