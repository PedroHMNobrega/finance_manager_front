import { LoadInstallmentListParams } from '@/domain/usecases'
import { Installment } from '@/domain/models'

export const mockLoadInstallmentListParams = (): LoadInstallmentListParams => ({
  token: 'any-token'
})

export const mockInstallment = (id): Installment => ({
  id: id,
  purchase: 1,
  number: 1,
  value_paid: 100.00,
  date: '2023-02-20',
  paid: true
})

export const mockInstallmentList = (): Installment[] => ([
  mockInstallment(1),
  mockInstallment(2)
])
