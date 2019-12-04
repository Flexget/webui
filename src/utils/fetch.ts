import * as humps from 'humps';

export class StatusError extends Error {
  status?: number;

  constructor(message: string, s?: number) {
    super(message);
    this.status = s;
  }
}

export const enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export interface APIResponse<T> extends Response {
  data?: T;
  headers: Headers;
}

interface ErrorBody {
  message: string;
}

export const camelize = <T>(obj: Object | Object[]) =>
  humps.camelizeKeys<Object, T>(obj, {
    separator: '_',
  });

const snakeCase = <T>(obj: Object | Object[]): T =>
  humps.decamelizeKeys(obj, {
    split: /(?=[A-Z0-9])/,
  });

export const isError = <T>(data: T | ErrorBody, s: number): data is ErrorBody =>
  !(s >= 200 && s < 300) && typeof data === 'object';

interface TypedResponse<T = Object> extends Response {
  data?: T;
  json(): Promise<T | ErrorBody>;
}

export const prepareResponse = <T>(data: Object, response: TypedResponse<T>) => ({
  data: camelize<T>(data),
  headers: response.headers,
});

const status = async <T>(response: TypedResponse<T>): Promise<APIResponse<T>> => {
  const data: T | ErrorBody = await response.json();
  if (!isError<T>(data, response.status)) {
    response.data = camelize<T>(data);
    return response;
  }
  const err = new StatusError(data.message);
  err.status = response.status;
  throw err;
};

export const prepareRequest = <BodyType>(method: Method, rawBody?: BodyType) => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (method !== Method.Get) {
    headers['Content-Type'] = 'application/json';
  }

  const body = rawBody ? JSON.stringify(snakeCase(rawBody)) : undefined;

  return {
    method,
    headers,
    body,
    credentials: 'same-origin',
  } as const;
};

export const request = async <BodyType, PayloadType>(
  resource: string,
  method: Method,
  rawBody?: BodyType,
): Promise<APIResponse<PayloadType>> => {
  const response = await fetch(`/api${resource}`, prepareRequest(method, rawBody));
  return status<PayloadType>(response);
};

export function get<T>(resource: string) {
  return request<undefined, T>(resource, Method.Get);
}

export function post<T>(resource: string): Promise<APIResponse<T>>;
export function post<Req, Res>(resource: string, body: Req): Promise<APIResponse<Res>>;
export function post<Req, Res>(resource: string, body = undefined) {
  return request<Req, Res>(resource, Method.Post, body);
}

export function patch<T>(resource: string): Promise<APIResponse<T>>;
export function patch<Req, Res>(resource: string, body: Req): Promise<APIResponse<Res>>;
export function patch<Req, Res>(resource: string, body = undefined) {
  return request<Req, Res>(resource, Method.Patch, body);
}

export function put<T>(resource: string): Promise<APIResponse<T>>;
export function put<Req, Res>(resource: string, body: Req): Promise<APIResponse<Res>>;
export function put<Req, Res>(resource: string, body = undefined) {
  return request<Req, Res>(resource, Method.Post, body);
}

export function del<T>(resource: string) {
  return request<undefined, T>(resource, Method.Delete);
}

export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
