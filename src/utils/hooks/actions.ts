interface PayloadAction<T, P> {
  readonly type: T;
  readonly payload: P;
}

interface NoPayloadAction<T> {
  readonly type: T;
}

export type Action<T, P = undefined> = P extends undefined
  ? NoPayloadAction<T>
  : PayloadAction<T, P>;
