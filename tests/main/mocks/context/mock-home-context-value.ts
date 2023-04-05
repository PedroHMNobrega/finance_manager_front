import { HomeDeps } from '@/main/factories/pages/home/home-fatory'
import { ValidationStub } from '@/tests/presentation/mocks'

export const mockHomeContextValue = (
  validationStub = new ValidationStub()
): HomeDeps => ({
  validation: validationStub
})
