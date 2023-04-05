import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/builder/validation-builder'

export const makeCreatePurchaseValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().build(),
    ...ValidationBuilder.field('value').required().build(),
    ...ValidationBuilder.field('category').required().build(),
    ...ValidationBuilder.field('installmentsNumber').required().build(),
    ...ValidationBuilder.field('firstInstallmentDate').required().build()
  ])
}
