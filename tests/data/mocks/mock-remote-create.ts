import { Create } from '@/domain/usecases'

export const createSpy = (): Create<any, any> => ({
  create: jest.fn()
})
