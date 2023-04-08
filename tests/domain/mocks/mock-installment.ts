import { LoadInstallmentListParams } from '@/domain/usecases'
import { Installment } from '@/domain/models'
import { UpdateInstallmentParams } from '@/domain/usecases/installment/update-installment'
import { UpdateParams } from '@/domain/usecases/update'

export const mockLoadInstallmentListParams = (): LoadInstallmentListParams => ({
  token: 'any-token'
})

export const mockUpdateInstallmentParams = (): UpdateParams<UpdateInstallmentParams> => ({
  token: 'any-token',
  id: 1,
  body: mockUpdateInstallment()
})

export const mockInstallment = (id): Installment => ({
  id: id,
  purchase: 1,
  number: 1,
  value_paid: 100.00,
  date: '2023-02-20',
  paid: true
})

export const mockUpdateInstallment = (): any => ({
  value_paid: 299.99,
  paid: true
})

export const mockInstallmentList = (): Installment[] => ([
  mockInstallment(1),
  mockInstallment(2)
])
