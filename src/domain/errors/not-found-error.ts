export class NotFoundError extends Error {
  constructor (model = 'Item') {
    super(`${model} não existe`)
    this.name = 'NotFoundError'
  }
}
