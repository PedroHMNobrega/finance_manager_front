import { Category } from '@/domain/models'
import { CategoryTypes } from '@/presentation/store/reducers/category/types'

type CategoryState = {
  categories: Category[]
  errorMessage: string
  loading: boolean
}

const initialState: CategoryState = {
  categories: [],
  errorMessage: '',
  loading: false
}

const reducer = (state = initialState, { type, payload }): CategoryState => {
  switch (type) {
    case CategoryTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        categories: payload
      }
    case CategoryTypes.REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      }
    case CategoryTypes.FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      }
    default:
      return state
  }
}

export default reducer
