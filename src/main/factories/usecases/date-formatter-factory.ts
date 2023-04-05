import { DateFormatter } from '@/domain/usecases/date'
import { JsdateDateFormatter } from '@/data/usecases/date/jsdate-date-formatter'

export const makeDateFormatter = (): DateFormatter => {
  return new JsdateDateFormatter()
}
