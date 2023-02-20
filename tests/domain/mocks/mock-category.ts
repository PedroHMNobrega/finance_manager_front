import { CreateCategoryParams } from '@/domain/usecases'
import { Category } from '@/domain/models'

export const mockCreateCategoryParams = (): CreateCategoryParams => ({
  category: mockCategory(null),
  token: 'any-token'
})

export const mockCategory = (id): Category => ({
  id: id,
  name: 'any-name'
})
