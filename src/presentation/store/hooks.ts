import { AppDispatch } from '@/presentation/store/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/presentation/store/reducers/root-reducer'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
