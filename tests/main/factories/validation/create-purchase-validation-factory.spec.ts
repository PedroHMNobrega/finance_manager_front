import { makeCreatePurchaseValidation } from '@/main/factories/validation/create-purchase-validation-factory'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

describe('CreatePurchaseValidationFactory', () => {
  it('should compose ValidationComposite with correct validations', () => {
    const composite = makeCreatePurchaseValidation()
    expect(composite).toStrictEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('value'),
      new RequiredFieldValidation('category'),
      new RequiredFieldValidation('installmentsNumber'),
      new RequiredFieldValidation('firstInstallmentDate')
    ]))
  })
})
