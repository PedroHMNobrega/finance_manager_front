import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/presentation/store/hooks'
import { LOGIN_LINK } from '@/presentation/util/links'

type Props = {
  children: JSX.Element
}

// TODO: Verificar logica accessToken
const PrivateRoute: React.FC<Props> = (props: Props) => {
  const user = useAppSelector(state => state.user.user)

  return user.accessToken
    ? props.children
    : <Navigate to={LOGIN_LINK.full()} />
}

export default PrivateRoute
