import { MoneyConverter } from '@/domain/usecases/conversion'
import { RegexMoneyConverter } from '@/data/usecases/conversion'

export const makeMoneyConverter = (): MoneyConverter => {
  return new RegexMoneyConverter('R$')
}
