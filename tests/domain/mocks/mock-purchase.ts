import { LoadPurchaseListParams } from '@/domain/usecases'
import { Purchase } from '@/domain/models'

export const mockLoadPurchaseListParams = (): LoadPurchaseListParams => ({
  token: 'any-token'
})

export const mockPurchaseList = (): Purchase[] => ([
  {
    id: 1,
    name: 'any-name1',
    installmentsNumber: 10,
    value: 100,
    category: 1,
    firstInstallmentData: '2023-02-19'
  },
  {
    id: 2,
    name: 'any-name2',
    installmentsNumber: 1,
    value: 10,
    category: 2,
    firstInstallmentData: '2022-01-10'
  }
])
