import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/builder/validation-builder'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(parseInt(process.env.PASSWORD_MIN_LENGTH)).build()
  ])
}
