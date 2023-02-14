import { makeLoginValidation } from '@/main/factories/validation/login-validation-factory'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

describe('LoginValidationFactory', () => {
  it('should compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toStrictEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 8)
    ]))
  })
})
