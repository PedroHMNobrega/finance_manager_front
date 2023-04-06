import { Container } from 'inversify'
import { DateFormatter } from '@/domain/usecases/date'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationStub } from '@/tests/presentation/mocks'
import { dateFormatterSpy } from '@/tests/data/mocks/mock-date-formatter'
import { Dependencies } from '@/presentation/dependencies'

export const mockContainer = (
  validationStub: Validation = new ValidationStub()
): Container => {
  const container = new Container()

  container.bind<DateFormatter>(Dependencies.DateFormatter).toConstantValue(dateFormatterSpy())
  container.bind<Validation>(Dependencies.CreatePurchaseValidation).toConstantValue(validationStub)

  return container
}
