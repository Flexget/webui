import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { css } from '@emotion/core';
import { PaperWrapper } from 'common/styles';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { useFlexgetStream } from 'core/api';
import { useMergeState } from 'utils/hooks';
import { stringify } from 'qs';
import { LogMessage, Options } from './types';
import Header from './Header';
import LogTable from './LogTable';

const wrapper = css`
  width: initial;
  flex: 1;
`;

const LogPage: FC = () => {
  useInjectPageTitle('Log');

  const [options, setOptions] = useMergeState<Options>({
    lines: 200,
    query: '',
  });

  const queryString = stringify(options);

  const [{ readyState, messages }, { connect, disconnect, clear }] = useFlexgetStream<LogMessage>(
    `/server/log?${queryString}`,
  );

  return (
    <PaperWrapper elevation={4}>
      <Header
        readyState={readyState}
        connect={connect}
        disconnect={disconnect}
        clear={clear}
        options={options}
        setOptions={setOptions}
      />
      <div css={wrapper}>
        <LogTable messages={messages} />
      </div>
    </PaperWrapper>
  );
};

export default hot(LogPage);
