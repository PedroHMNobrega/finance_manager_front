import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { InvalidFieldError } from '@/validation/errors'

type SutTypes = {
  sut: MinLengthValidation
}

const makeSut = (): SutTypes => {
  const sut = new MinLengthValidation('any-type', 5)
  return {
    sut
  }
}

describe('MinLengthValidation', () => {
  it('should return error if length is invalid', () => {
    const { sut } = makeSut()
    let error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())

    error = sut.validate('1234')
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if length is valid', () => {
    const { sut } = makeSut()
    let error = sut.validate('12345')
    expect(error).toBeFalsy()

    error = sut.validate('123456')
    expect(error).toBeFalsy()
  })
})
