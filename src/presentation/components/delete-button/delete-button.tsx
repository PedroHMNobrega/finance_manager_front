import React from 'react'
import Styles from './delete-button-styles.scss'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { WithLoading } from '@/presentation/components'
import { SpinnerSize } from '@/presentation/components/spinner/spinner'

type Props = {
  id: number
  callback: Function
  loading?: boolean
}

const DeleteButton: React.FC<Props> = ({ id, callback, loading = false }: Props) => {
  const handleClick: React.MouseEventHandler<SVGSVGElement> = (): void => {
    callback(id)
  }

  return (
    <WithLoading loadingClass={Styles.loading} loading={loading} size={SpinnerSize.MEDIUM}>
      <FontAwesomeIcon icon={faTrash} className={Styles.icon} onClick={handleClick} data-testid="delete-button" id={`${id}`} />
    </WithLoading>
  )
}

export default DeleteButton
