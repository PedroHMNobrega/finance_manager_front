export class InvalidLinkError extends Error {
  constructor (path) {
    super(`"${path}" is not a valid link`)
    this.name = 'InvalidLinkError'
  }
}
