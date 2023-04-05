import { HomeDeps } from '@/main/factories/pages/home/home-fatory'
import { ValidationStub } from '@/tests/presentation/mocks'
import { dateFormatterSpy } from '@/tests/data/mocks/mock-date-formatter'

export const mockHomeContextValue = (
  validationStub = new ValidationStub()
): HomeDeps => ({
  validation: validationStub,
  dateFormatter: dateFormatterSpy()
})
