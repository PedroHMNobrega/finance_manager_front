import React from 'react'
import { Spinner } from '@/presentation/components'

type Props = {
  children: React.ReactNode
  loadingClass: string
  loading: boolean
}

const WithLoading: React.FC<Props> = (props: Props) => {
  return (
    <div data-testid="with-loading">
      { props.loading && <Spinner className={props.loadingClass} />}
      { !props.loading && props.children}
    </div>
  )
}

export default WithLoading
