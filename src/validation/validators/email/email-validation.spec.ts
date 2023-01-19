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
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError('email'))
  })
})
