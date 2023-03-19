import { SetJwt } from '@/domain/usecases'
import { setJwtSpy } from '@/tests/data/mocks/mock-jwt-usecase'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'
import { mockJwt } from '@/tests/domain/mocks'
import { UserSaga } from '@/presentation/store/reducers'

type SutTypes = {
  sut: UserSaga
  jwtSpy: SetJwt
}

const makeSut = (): SutTypes => {
  const jwtSpy = setJwtSpy()
  const sut = new UserSaga(jwtSpy)

  return {
    sut,
    jwtSpy
  }
}

describe('Saga', () => {
  it('should call setJwt with correct values', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.setUser(), mockJwt())
    expect(jwtSpy.set).toHaveBeenCalledTimes(1)
    expect(jwtSpy.set).toHaveBeenCalledWith(mockJwt())
  })
})
