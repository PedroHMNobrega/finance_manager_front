import React from 'react'
import Styles from './delete-button-styles.scss'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  id: number
  callback: Function
}

const DeleteButton: React.FC<Props> = (props: Props) => {
  const handleClick: React.MouseEventHandler<SVGSVGElement> = (): void => {
    props.callback(props.id)
  }

  return (
    <FontAwesomeIcon icon={faTrash} className={Styles.icon} onClick={handleClick} />
  )
}

export default DeleteButton
