import { UpdateParams } from '@/domain/usecases/update'

export type UpdateInstallmentParams = UpdateParams & {
  installment: {
    value_paid: number
    paid: boolean
  }
}
