import { CreateParams, CreatePurchaseParams, DeletePurchaseParams, LoadPurchaseListParams } from '@/domain/usecases'
import { Purchase } from '@/domain/models'

export const mockLoadPurchaseListParams = (): LoadPurchaseListParams => ({
  token: 'any-token'
})

export const mockCreatePurchaseParams = (): CreateParams<CreatePurchaseParams> => ({
  body: mockPurchase(null),
  token: 'any-token'
})

export const mockDeletePurchaseParams = (): DeletePurchaseParams => ({
  id: 33,
  token: 'any-token'
})

export const mockPurchase = (id): Purchase => ({
  id: id,
  name: 'any-name',
  installmentsNumber: 10,
  value: 100,
  category: 1,
  firstInstallmentDate: '2023-02-19'
})

export const mockPurchaseList = (): Purchase[] => ([
  mockPurchase(1),
  mockPurchase(2)
])
