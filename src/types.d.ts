import { RequestHandler } from 'express'
type RHWithBody<T> = RequestHandler<{}, {}, T>
type RHWithParams<T> = RequestHandler<T, {}, {}>
