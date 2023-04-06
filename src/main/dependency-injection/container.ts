import { Container } from 'inversify'
import { DateFormatter } from '@/domain/usecases/date'
import { Validation } from '@/presentation/protocols/validation'
import {
  makeCreatePurchaseValidation,
  makeDateFormatter,
  makeLoginValidation,
  makeMoneyConverter, makeRemoteAuthentication
} from '@/main/factories'
import { Dependencies } from '@/presentation/dependencies'
import { MoneyConverter } from '@/domain/usecases/conversion'
import { Authentication } from '@/domain/usecases'

const container = new Container()

container.bind<Validation>(Dependencies.CreatePurchaseValidation).toConstantValue(makeCreatePurchaseValidation())
container.bind<Validation>(Dependencies.LoginValidation).toConstantValue(makeLoginValidation())
container.bind<DateFormatter>(Dependencies.DateFormatter).toConstantValue(makeDateFormatter())
container.bind<MoneyConverter>(Dependencies.MoneyConverter).toConstantValue(makeMoneyConverter())
container.bind<Authentication>(Dependencies.Authentication).toConstantValue(makeRemoteAuthentication())

export { container }
