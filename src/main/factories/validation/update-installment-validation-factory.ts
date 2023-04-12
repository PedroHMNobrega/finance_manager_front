import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/builder/validation-builder'

export const makeUpdateInstallmentValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('value').required().build()
  ])
}
