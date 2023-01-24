import { ValidationBuilder } from '@/validation/builder/validation-builder'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'

type SutTypes = {
  sut: ValidationBuilder
}

const makeSut = (fieldName: string): SutTypes => {
  const sut = ValidationBuilder.field(fieldName)
  return {
    sut
  }
}

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const fieldName = 'any_field'
    const { sut } = makeSut(fieldName)
    const validations = sut.required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
    expect(validations[0]).toBeInstanceOf(RequiredFieldValidation)
  })

  it('should return MinLengthValidation', () => {
    const fieldName = 'any_field'
    const minLength = 5
    const { sut } = makeSut(fieldName)
    const validations = sut.min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)])
    expect(validations[0]).toBeInstanceOf(MinLengthValidation)
  })

  it('should return EmailValidation', () => {
    const fieldName = 'any_field'
    const { sut } = makeSut(fieldName)
    const validations = sut.email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
    expect(validations[0]).toBeInstanceOf(EmailValidation)
  })

  it('should return a list of validations', () => {
    const fieldName = 'any_field'
    const minLength = 2
    const { sut } = makeSut(fieldName)
    const validations = sut.email().min(minLength).required().build()
    expect(validations).toEqual([
      new EmailValidation(fieldName),
      new MinLengthValidation(fieldName, minLength),
      new RequiredFieldValidation(fieldName)
    ])
  })
})
