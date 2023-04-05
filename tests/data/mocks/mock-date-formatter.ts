import { DateFormatter } from '@/domain/usecases/date'

export const dateFormatterSpy = (): DateFormatter => ({
  format: jest.fn(() => {
    return '02/02/2222'
  })
})
