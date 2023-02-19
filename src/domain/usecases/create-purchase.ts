import { Purchase } from '@/domain/models'

export type CreatePurchaseParams = {
  purchase: Purchase
  token: string
}

export interface CreatePurchase {
  create(params: CreatePurchaseParams): Promise<Purchase>
}
