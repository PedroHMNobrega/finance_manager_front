import { Load } from '@/domain/usecases'

export const loadSpy = (): Load<any, any> => ({
  loadAll: jest.fn(async () => {
    return Promise.resolve([])
  })
})
