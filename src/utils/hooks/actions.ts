export interface PayloadAction<T extends string, P> {
  readonly type: T;
  readonly payload: P;
}

interface NoPayloadAction<T extends string> {
  readonly type: T;
}

export type Action<T extends string, P = undefined> = P extends undefined
  ? NoPayloadAction<T>
  : PayloadAction<T, P>;

export function action<T extends string>(type: T): NoPayloadAction<T>;
export function action<T extends string, P>(type: T, payload: P): PayloadAction<T, P>;
export function action(type, payload?) {
  if (payload) {
    return {
      type,
      payload,
    };
  }

  return { type };
}
