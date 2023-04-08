import { Update } from '@/domain/usecases/update'

export const updateSpy = (): Update<any, any> => ({
  update: jest.fn()
})
