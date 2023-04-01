import React from 'react'
import Styles from './modal-styles.scss'

type Props = {
  title: string
  children: React.ReactNode
  setOpen: Function
  name?: string
}

const Modal: React.FC<Props> = ({ children, title, setOpen, name }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setOpen(false)
  }

  return (
    <div className={Styles.mask}>
      <div className={Styles.modal} data-testid={name}>
        <div className={Styles.title_container}>
          <h2 data-testid="modal-title">{title}</h2>
          <div className={Styles.close} data-testid="modal-close" onClick={handleClick}>X</div>
        </div>
        <div className={Styles.children_container}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
