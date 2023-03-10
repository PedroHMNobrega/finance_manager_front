import { CategoryTypes } from '@/presentation/store/reducers/category/types'

export const LoadCategories = {
  fail: (payload) => ({
    type: CategoryTypes.FAIL,
    payload
  }),
  request: () => ({
    type: CategoryTypes.REQUEST
  }),
  success: (payload) => ({
    type: CategoryTypes.SUCCESS,
    payload
  })
}
