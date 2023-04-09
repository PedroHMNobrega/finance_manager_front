import { LinkPath } from '@/data/usecases'
import { InvalidLinkError } from '@/domain/errors'

describe('Link', () => {
  it('should throw InvalidLinkError when passing empty link', () => {
    const error = (): void => {
      const p = new LinkPath('')
    }
    expect(error).toThrow(new InvalidLinkError(''))
  })

  it('should throw InvalidLinkError if link does not start with /', () => {
    const error = (): void => {
      const p = new LinkPath('my/link')
    }
    expect(error).toThrow(new InvalidLinkError('my/link'))
  })

  it('should throw InvalidLinkError if link ends with /', () => {
    const error = (): void => {
      const p = new LinkPath('/my/link/')
    }
    expect(error).toThrow(new InvalidLinkError('/my/link/'))
  })

  it.each([
    { full: '/', relative: '' },
    { full: '/any', relative: 'any' },
    { full: '/any/link', relative: 'link' },
    { full: '/any/other/link/path', relative: 'path' }
  ])('Should return correct result on .full() and .relative() methods', ({ full, relative }) => {
    const linkPath = new LinkPath(full)
    expect(linkPath.full()).toBe(full)
    expect(linkPath.relative()).toBe(relative)
  })
})
