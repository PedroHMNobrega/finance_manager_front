export class NotFoundError extends Error {
  constructor (model) {
    super(`${model} não existe`)
    this.name = 'NotFoundError'
  }
}
