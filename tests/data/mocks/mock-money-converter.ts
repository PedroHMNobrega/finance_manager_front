import { MoneyConverter } from '@/domain/usecases/conversion'

export const moneyConverterSpy = (): MoneyConverter => ({
  toMoney: jest.fn(() => {
    return 'R$ 12.10'
  })
})
