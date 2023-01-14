export enum HttpStatusCode {
  ok = 200,
  unauthorized = 401,
  badRequest = 400,
  serverError = 500,
  notFound = 404
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
