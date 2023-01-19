import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators/email/email-validation'

type SutTypes = {
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidation('email')
  return {
    sut
  }
}

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate('any-word')
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should false if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate('any@email.com')
    expect(error).toBeFalsy()
  })
})
