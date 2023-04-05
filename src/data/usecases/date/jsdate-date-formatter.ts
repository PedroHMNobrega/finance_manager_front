import { DateFormatter } from '@/domain/usecases/date'

export class JsdateDateFormatter implements DateFormatter {
  format = (dateStr: string): string => {
    const date = new Date(dateStr)
    const day = this.padNumber(date.getUTCDate(), 2)
    const month = this.padNumber(date.getUTCMonth() + 1, 2)
    const year = this.padNumber(date.getUTCFullYear(), 4)
    return `${day}/${month}/${year}`
  }

  private padNumber (number: number, maxLength: number): string {
    return number.toString().padStart(maxLength, '0')
  }
}
