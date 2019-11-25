import { RequestMeta } from './util';

export interface ErrorPayload {
  message: string;
  statusCode: number;
}

export interface Requests {
  [k: string]: RequestMeta;
}
