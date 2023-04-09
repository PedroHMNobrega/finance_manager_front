import { Purchase } from '@/domain/models/purchase'

export type Installment = {
  id: number
  purchase: Purchase
  number: number
  value_paid: number
  date: string
  paid: boolean
  category: string
}
