import { Load } from '@/domain/usecases'

export const loadAllReturnValue = 'any-value'

export const loadSpy = (): Load<any, any> => ({
  loadAll: jest.fn()
})
