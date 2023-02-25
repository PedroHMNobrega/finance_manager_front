import React from 'react'
import Styles from './modal-styles.scss'

type Props = {
  title: string
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ children, title }: Props) => {
  return (
    <div className={Styles.mask}>
      <div className={Styles.modal}>
        <div className={Styles.title_container}>
          <h2>{title}</h2>
          <div className={Styles.close}>X</div>
        </div>
        <div className={Styles.children_container}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
