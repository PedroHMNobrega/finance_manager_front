import { RegexMoneyConverter } from '@/data/usecases/conversion'

type SutTypes = {
  sut: RegexMoneyConverter
}

const currency = 'R$'

const makeSut = (): SutTypes => {
  const sut = new RegexMoneyConverter(currency)
  return {
    sut
  }
}

describe('RegexMoneyConverter', () => {
  it.each([
    { str: 'q' },
    { str: '.' },
    { str: ',' }
  ])('toMoney should return zero if no number is provided', ({ str }) => {
    const { sut } = makeSut()
    const result = sut.toMoney(str)
    expect(result).toBe(`${currency} 0.00`)
  })

  it('toMoney should remove leading zeros from input string', () => {
    const { sut } = makeSut()
    const result = sut.toMoney('0000000001.0')
    expect(result).toBe(`${currency} 0.10`)
  })

  it.each([
    { str: '1', expectedResult: '0.01' },
    { str: '11', expectedResult: '0.11' },
    { str: '111', expectedResult: '1.11' }
  ])('toMoney should add leading zeros if necessary', ({ str, expectedResult }) => {
    const { sut } = makeSut()
    const result = sut.toMoney(str)
    expect(result).toBe(`${currency} ${expectedResult}`)
  })
})
