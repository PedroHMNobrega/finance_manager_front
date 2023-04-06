import { Container } from 'inversify'
import { DateFormatter } from '@/domain/usecases/date'
import { Validation } from '@/presentation/protocols/validation'
import { makeCreatePurchaseValidation, makeDateFormatter } from '@/main/factories'
import { Dependencies } from '@/presentation/dependencies'

const container = new Container()

container.bind<DateFormatter>(Dependencies.DateFormatter).toConstantValue(makeDateFormatter())
container.bind<Validation>(Dependencies.CreatePurchaseValidation).toConstantValue(makeCreatePurchaseValidation())

export { container }
