import { CreateCategoryParams, CreateParams, DeleteCategoryParams, LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'

export const mockLoadCategoryListParams = (): LoadCategoryListParams => ({
  token: 'any-token'
})

export const mockCreateCategoryParams = (): CreateParams<CreateCategoryParams> => ({
  body: mockCategory(null),
  token: 'any-token'
})

export const mockDeleteCategoryParams = (): DeleteCategoryParams => ({
  id: 44,
  token: 'any-token'
})

export const mockCategory = (id): Category => ({
  id: id,
  name: 'any-name'
})

export const mockCategoryList = (): Category[] => ([
  mockCategory(1),
  mockCategory(2)
])
