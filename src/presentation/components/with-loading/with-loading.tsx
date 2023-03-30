import React from 'react'
import { Spinner } from '@/presentation/components'
import { SpinnerSize } from '@/presentation/components/spinner/spinner'

type Props = {
  children: React.ReactNode
  loadingClass: string
  loading: boolean
  size?: SpinnerSize
}

const WithLoading: React.FC<Props> = (props: Props) => {
  return (
    <div data-testid="with-loading">
      { props.loading && <Spinner className={props.loadingClass} size={props.size} />}
      { !props.loading && props.children}
    </div>
  )
}

export default WithLoading
