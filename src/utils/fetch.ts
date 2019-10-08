import * as humps from 'humps';

export class StatusError extends Error {
  status?: number;

  constructor(message: string, s?: number) {
    super(message);
    this.status = s;
  }
}

enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

interface APIResponse<T> {
  data: T;
  headers: Headers;
}

interface ErrorBody {
  message: string;
}

const camelize = <T>(obj: Object | Object[]) =>
  humps.camelizeKeys<Object, T>(obj, {
    separator: '_',
  });

const snakeCase = <T>(obj: Object | Object[]): T =>
  humps.decamelizeKeys(obj, {
    split: /(?=[A-Z0-9])/,
  });

function isError<T>(data: T | ErrorBody, s: number): data is ErrorBody {
  return !(s >= 200 && s < 300) && typeof data === 'object';
}

interface TypedResponse<T = Object> extends Response {
  json(): Promise<T | ErrorBody>;
}

async function status<T>(response: TypedResponse<T>): Promise<APIResponse<T>> {
  const data: T | ErrorBody = await response.json();
  if (!isError(data, response.status)) {
    return {
      data: camelize<T>(data),
      headers: response.headers,
    };
  }
  const err = new StatusError(data.message);
  err.status = response.status;
  throw err;
}

async function request<BodyType, PayloadType>(
  resource: string,
  method: Method,
  rawBody?: BodyType,
): Promise<APIResponse<PayloadType>> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (method !== Method.Get) {
    headers['Content-Type'] = 'application/json';
  }

  const body = rawBody ? JSON.stringify(snakeCase(rawBody)) : undefined;

  const response = await fetch(`/api${resource}`, {
    method,
    headers,
    body,
    credentials: 'same-origin',
  });
  return status<PayloadType>(response);
}

export function get<T>(resource: string) {
  return request<undefined, T>(resource, Method.Get);
}

export function post<T>(resource: string): Promise<APIResponse<T>>;
export function post<Req, Res>(resource: string, body: Req): Promise<APIResponse<Res>>;
export function post<Req, Res>(resource: string, body = undefined) {
  return request<Req, Res>(resource, Method.Post, body);
}

export function put<T>(resource: string): Promise<APIResponse<T>>;
export function put<Req, Res>(resource: string, body: Req): Promise<APIResponse<Res>>;
export function put<Req, Res>(resource: string, body = undefined) {
  return request<Req, Res>(resource, Method.Put, body);
}

export function del(resource: string) {
  return request(resource, Method.Delete);
}
