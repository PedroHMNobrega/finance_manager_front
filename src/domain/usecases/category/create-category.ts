import { CreateParams } from '@/domain/usecases'
import { Category } from '@/domain/models'

export type CreateCategoryParams = CreateParams & {
  category: Category
}
