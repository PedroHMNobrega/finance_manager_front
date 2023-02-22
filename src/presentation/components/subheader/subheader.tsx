import React from 'react'
import Styles from './subheader-styles.scss'
import { Link } from 'react-router-dom'

export type SubheaderLink = {
  name: string
  url: string
}

type Props = {
  links: SubheaderLink[]
}

const Subheader: React.FC<Props> = ({ links }: Props) => {
  return (
    <div className={Styles.header}>
      <div className={Styles.links_container}>
        {links.map(link => (
          <Link key={link.url} to={link.url} className={Styles.link}>{ link.name }</Link>
        ))}
      </div>
    </div>
  )
}

export default Subheader
