import { useState, useCallback, useReducer, useEffect } from 'react';
import { useFormikContext } from 'formik';

export const useOverlayState = (defaultState = false) => {
  const [isOpen, setOpen] = useState(defaultState);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen(o => !o), []);

  return [isOpen, { open, close, toggle }] as const;
};

export const useMergeState = <T>(defaultState: T) => {
  return useReducer(
    (state: T, action: Partial<T>): T => ({
      ...state,
      ...action,
    }),
    defaultState,
  );
};

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};

export const useDebounceFormikSubmit = (delay?: number) => {
  const { values, submitForm } = useFormikContext<{}>();

  const debouncedValues = useDebounce(values, delay);
  useEffect(() => {
    submitForm();
  }, [...Object.values(debouncedValues), submitForm]); // eslint-disable-line react-hooks/exhaustive-deps
};
