import * as humps from 'humps';
import { uriParser } from 'utils';
import is from 'utils/is';

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

export const snakeCase = <T>(obj: Object | Object[]): T =>
  humps.decamelizeKeys(obj, {
    split: /(?=[A-Z])/,
  });

export interface TypedResponse<T, U = undefined> extends Response {
  data: T;
  json(): Promise<T>;
  error: U;
}

export interface ErrorResponse extends TypedResponse<ErrorBody, StatusError> {
  ok: false;
}

export interface SuccessResponse<T> extends OptionalProps<TypedResponse<T>, 'error'> {
  ok: true;
}

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

const status = async <T>(r: Response, skipCamelize = false): Promise<APIResponse<T>> => {
  const response = r as APIResponse<T>;
  try {
    response.data = await response.json();
  } catch (err) {
    // do nothing for nwo;
  }

  if (response.ok) {
    response.data = response.data && !skipCamelize ? camelize<T>(response.data) : response.data;
  } else {
    response.error = new StatusError(response.data?.message, response.status);
  }
  return response;
};

export const request = async <PayloadType, BodyType = undefined>(
  resource: string,
  method: Method,
  rawBody: BodyType,
  opts: RequestInit = {},
  skipCamelize = false,
): Promise<APIResponse<PayloadType>> => {
  const options: RequestInit = { method };

  const headers = {
    ...opts.headers,
    Accept: 'application/json',
  };

  if (method !== Method.Get && rawBody) {
    headers['Content-Type'] = 'application/json';
  }

  options.body = rawBody ? JSON.stringify(snakeCase(rawBody)) : undefined;
  options.credentials = 'same-origin';

  const response: Response = await fetch(resource, { ...options, ...opts, headers });
  return status<PayloadType>(response, skipCamelize);
};

