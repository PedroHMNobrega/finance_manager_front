export type DeletePurchaseParams = {
  purchaseId: number
  token: string
}

export interface DeletePurchase {
  delete(params: DeletePurchaseParams): Promise<void>
}
