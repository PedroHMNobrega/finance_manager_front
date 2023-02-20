import { Purchase } from '@/domain/models'

export type LoadPurchaseListParams = {
  token: string
}

export interface LoadPurchaseList {
  loadAll(params: LoadPurchaseListParams): Promise<Purchase[]>
}
