import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { FieldValidationSpy } from '@/tests/validation/mocks/mock-field-validation'

type SutTypes = {
  sut: ValidationComposite
}

const makeSut = (validators: FieldValidation[]): SutTypes => {
  const sut = ValidationComposite.build(validators)
  return {
    sut
  }
}

describe('ValidationComposite', () => {
  it('should return error if any field validator fails', () => {
    const fieldName = 'any_field'
    const errorMessage = 'any-message'

    const fieldValidationSpy = new FieldValidationSpy(fieldName)
    const fieldValidationSpy2 = new FieldValidationSpy(fieldName)
    fieldValidationSpy2.error = new Error('any-message')

    const { sut } = makeSut([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    const error = sut.validate(fieldName, 'any_value')
    expect(error).toBe(errorMessage)
  })

  it('should return the first error if field validator fails', () => {
    const fieldName = 'any_field'

    const fieldValidationSpy = new FieldValidationSpy(fieldName)
    fieldValidationSpy.error = new Error('first-error')
    const fieldValidationSpy2 = new FieldValidationSpy(fieldName)
    fieldValidationSpy2.error = new Error('second-error')

    const { sut } = makeSut([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    const error = sut.validate(fieldName, 'any_value')
    expect(error).toBe('first-error')
  })

  it('should not return error if validator from other field fails', () => {
    const correctFieldName = 'correct-field'
    const fieldValidationSpy = new FieldValidationSpy(correctFieldName)
    const fieldValidationSpy2 = new FieldValidationSpy('other-field')
    fieldValidationSpy2.error = new Error('any-error')

    const { sut } = makeSut([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    const error = sut.validate(correctFieldName, 'any_value')
    expect(error).toBeFalsy()
  })

  it('should not return error if validators succeeds', () => {
    const fieldName = 'any_field'

    const fieldValidationSpy = new FieldValidationSpy(fieldName)
    const fieldValidationSpy2 = new FieldValidationSpy(fieldName)

    const { sut } = makeSut([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    const error = sut.validate(fieldName, 'any_value')
    expect(error).toBeFalsy()
  })
})
