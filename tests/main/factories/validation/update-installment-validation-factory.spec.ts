import { makeUpdateInstallmentValidation } from '@/main/factories'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

describe('UpdateInstallmentValidationFactory', () => {
  it('should compose ValidationComposite with correct validations', () => {
    const composite = makeUpdateInstallmentValidation()
    expect(composite).toStrictEqual(ValidationComposite.build([
      new RequiredFieldValidation('value')
    ]))
  })
})
