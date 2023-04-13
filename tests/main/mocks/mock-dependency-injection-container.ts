import { Container } from 'inversify'
import { DateFormatter } from '@/domain/usecases/date'
import { Validation } from '@/presentation/protocols/validation'
import { AuthenticationSpy, ValidationStub } from '@/tests/presentation/mocks'
import { dateFormatterSpy } from '@/tests/data/mocks/mock-date-formatter'
import { Dependencies } from '@/presentation/dependencies'
import { MoneyConverter } from '@/domain/usecases/conversion'
import { moneyConverterSpy } from '@/tests/data/mocks'
import { Authentication } from '@/domain/usecases'

export const mockContainer = (
  validationStub: Validation = new ValidationStub()
): Container => {
  const container = new Container()

  container.bind<Validation>(Dependencies.CreatePurchaseValidation).toConstantValue(validationStub)
  container.bind<Validation>(Dependencies.UpdateInstallmentValidation).toConstantValue(validationStub)
  container.bind<Validation>(Dependencies.LoginValidation).toConstantValue(validationStub)
  container.bind<DateFormatter>(Dependencies.DateFormatter).toConstantValue(dateFormatterSpy())
  container.bind<MoneyConverter>(Dependencies.MoneyConverter).toConstantValue(moneyConverterSpy())
  container.bind<Authentication>(Dependencies.Authentication).toConstantValue(new AuthenticationSpy())

  return container
}
