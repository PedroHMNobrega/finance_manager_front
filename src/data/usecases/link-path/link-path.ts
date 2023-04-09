import { LinkInterface } from '@/domain/usecases'
import { InvalidLinkError } from '@/domain/errors'

export class LinkPath implements LinkInterface {
  private readonly full_path: string
  private readonly relative_path: string

  constructor (full_path: string) {
    this.validatePath(full_path)
    this.full_path = full_path
    this.relative_path = this.getRelativePath(full_path)
  }

  private validatePath (full_path: string): void {
    if (
      full_path.length === 0 ||
      full_path[0] !== '/' ||
      (full_path.length !== 1 && full_path[full_path.length - 1] === '/')
    ) {
      throw new InvalidLinkError(full_path)
    }
  }

  private getRelativePath (full_path): string {
    const path = full_path.split('/')
    return path[path.length - 1]
  }

  full (): string {
    return this.full_path
  }

  relative (): string {
    return this.relative_path
  }
}
