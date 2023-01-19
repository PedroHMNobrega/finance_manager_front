import { RequiredFieldValidation } from '@/validation/required-field/required-field-validation'
import { RequiredFieldError } from '@/validation/errors'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('any-field')
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('any-email')
    expect(error).toBeFalsy()
  })
})
