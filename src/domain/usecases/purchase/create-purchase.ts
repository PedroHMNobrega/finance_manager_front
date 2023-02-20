import { Purchase } from '@/domain/models'
import { CreateParams } from '@/domain/usecases'

export type CreatePurchaseParams = CreateParams & {
  purchase: Purchase
}
