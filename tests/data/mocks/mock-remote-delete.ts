import { Delete } from '@/domain/usecases'

export const deleteSpy = (): Delete<any, any> => ({
  delete: jest.fn()
})
