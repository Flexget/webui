import * as humps from 'humps';
import { uriParser } from 'utils';

export class StatusError extends Error {
  status?: number;

  constructor(message = 'Error', s?: number) {
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

export interface TypedResponse<T, U = undefined> extends Response {
  data: T;
  json(): Promise<T>;
  error: U;
}

export type ErrorResponse = TypedResponse<ErrorBody, StatusError>;

export type SuccessResponse<T> = OptionalProps<TypedResponse<T>, 'error'>;

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

type PartialResponse<T> = Partial<APIResponse<T>> & Response;

interface IsError {
  <T>(resp: PartialResponse<T>): resp is PartialResponse<ErrorResponse> & Response;
  <T>(resp: APIResponse<T>): resp is ErrorResponse;
}

export const isError: IsError = (resp: Response): resp is ErrorResponse => !resp.ok;

export const prepareResponse = <T>(data: Object, response: TypedResponse<T>) => ({
  data: camelize<T>(data),
  headers: response.headers,
});

const status = async <T>(response: PartialResponse<T>): Promise<APIResponse<T>> => {
  response.data = await response.json();

  if (!isError(response)) {
    response.data = response.data && camelize<T>(response.data);
  } else {
    response.error = new StatusError(response.data?.message, response.status);
  }
  return response as APIResponse<T>;
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

export const request = async <PayloadType, BodyType = undefined>(
  resource: string,
  method: Method,
  rawBody: BodyType,
): Promise<APIResponse<PayloadType>> => {
  const response: PartialResponse<PayloadType> = await fetch(
    resource,
    prepareRequest(method, rawBody),
  );
  return status<PayloadType>(response);
};

const requestOld = async <PayloadType, BodyType = undefined>(
  resource: string,
  method: Method,
  rawBody?: BodyType,
): Promise<APIResponse<PayloadType>> => {
  const response = await request<PayloadType, typeof rawBody>(
    `${uriParser(document.baseURI).pathname}api${resource}`,
    method,
    rawBody,
  );
  if ('error' in response) {
    throw response.error;
  }
  return response;
};

export function get<T>(resource: string) {
  return requestOld<T>(resource, Method.Get, undefined);
}

export function post<T>(resource: string): Promise<APIResponse<T>>;
export function post<Req, Res>(resource: string, body: Req): Promise<APIResponse<Res>>;
export function post(resource: string, body = undefined) {
  return requestOld(resource, Method.Post, body);
}

export function patch<T>(resource: string): Promise<APIResponse<T>>;
export function patch<Req, Res>(resource: string, body: Req): Promise<APIResponse<Res>>;
export function patch(resource: string, body = undefined) {
  return requestOld(resource, Method.Patch, body);
}

export function put<T>(resource: string): Promise<APIResponse<T>>;
export function put<Req, Res>(resource: string, body: Req): Promise<APIResponse<Res>>;
export function put(resource: string, body = undefined) {
  return requestOld(resource, Method.Post, body);
}

export function del<T>(resource: string) {
  return requestOld<undefined, T>(resource, Method.Delete, undefined);
}

export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
