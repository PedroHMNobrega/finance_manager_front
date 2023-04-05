import { JsdateDateFormatter } from '@/data/usecases/date/jsdate-date-formatter'

type SutTypes = {
  sut: JsdateDateFormatter
}

const makeSut = (): SutTypes => {
  const sut = new JsdateDateFormatter()
  return {
    sut
  }
}

describe('JsdateDateFormatter', () => {
  it('should format the date correctly', () => {
    const { sut } = makeSut()
    const date1 = '1999-3-1'
    const date2 = '2023-12-03'

    expect(sut.format(date1)).toBe('01/03/1999')
    expect(sut.format(date2)).toBe('03/12/2023')
  })
})
