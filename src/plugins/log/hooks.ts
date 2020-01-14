import { useCallback, useReducer, useEffect } from 'react';
import { stringify } from 'qs';
import { useFlexgetStream } from 'core/api';
import { camelize } from 'utils/fetch';
import { LogMessage, Options } from './types';

export const useLogStream = (options: Options) => {
  const queryString = stringify(options);
  const [messages, addMessage] = useReducer(
    (state: LogMessage[], message: LogMessage | 'clear') =>
      message !== 'clear' ? [message, ...state] : [],
    [],
  );
  const [{ readyState, stream }, { connect: connectFn, disconnect }] = useFlexgetStream(
    `/server/log?${queryString}`,
  );

  useEffect(() => {
    stream?.node('{message task}', (message: LogMessage) => addMessage(camelize(message)));
  }, [stream]);

  const clear = useCallback(() => addMessage('clear'), []);

  const connect = useCallback(() => {
    clear();
    connectFn();
  }, [clear, connectFn]);

  return [
    { messages, readyState },
    { connect, disconnect, clear },
  ] as const;
};
