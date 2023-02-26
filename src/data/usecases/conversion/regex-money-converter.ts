import { MoneyConverter } from '@/domain/usecases/conversion'

export class RegexMoneyConverter implements MoneyConverter {
  constructor (
    private readonly currency: string
  ) {}

  toMoney (str: string): string {
    let chars = str.split('')
    chars = chars.filter(char => /[0-9]/.test(char))

    chars = this.removeLeadingZeros(chars)

    let value = this.pad(chars.join(''), 3)

    value = `${this.currency} ${value.substring(0, value.length - 2)}.${value.substring(value.length - 2)}`

    return value
  }

  private removeLeadingZeros (chars: string[]): string[] {
    while (chars[0] === '0') chars.shift()
    return chars
  }

  private pad (number: string, size: number): string {
    while (number.length < size) number = '0' + number
    return number
  }
}
