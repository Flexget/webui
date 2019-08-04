import * as humps from 'humps';

export class StatusError extends Error {
  status?: number;
}

enum Method {
  Get = 'get',
  Post = 'post',
  Put ='put',
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

const camelize = <T>(obj: Object | Object[]) => humps.camelizeKeys<Object, T>(obj, {
  separator: '_',
});

const snakeCase = <T>(obj: Object | Object[]): T => humps.decamelizeKeys(obj, {
  split: /(?=[A-Z0-9])/,
});

function isError<T>(data: T | ErrorBody, s): data is ErrorBody {
  return !(s >= 200 && s < 300) && typeof data === 'object';
}

interface TypedResponse<T = Object> extends Response {
  json<P = T>(): Promise<P | void>;
}

function status<T>(response: TypedResponse<T | ErrorBody>): Promise<APIResponse<T>> {
  return response.json().then((data: T | ErrorBody) => {
    if (!isError(data, response.status)) {
      return {
        data: camelize<T>(data),
        headers: response.headers,
      };
    }
    const err = new StatusError(data.message);
    err.status = response.status;
    throw err;
  });
}

function request<PayloadType, BodyType>(
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

  return fetch(`/api${resource}`, {
    method,
    headers,
    body,
    credentials: 'same-origin',
  })
    .then((response: Response) => status<PayloadType>(response));
}

export function get(resource) {
  return request(resource, Method.Get);
}

export function post(resource, body) {
  return request(resource, Method.Post, body);
}

export function put(resource, body) {
  return request(resource, Method.Put, body);
}

export function del(resource) {
  return request(resource, Method.Delete);
}
