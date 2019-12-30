import React, { FC } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { css, ClassNames } from '@emotion/core';
import { Theme, useTheme } from '@material-ui/core';
import { LogMessage, LogLevel } from 'plugins/log/types';

const color = (theme: Theme, hex: string) =>
  theme.palette.type === 'light'
    ? css`
        background-color: ${hex};
      `
    : css`
        color: ${hex};
      `;

const table = css`
  font-size: 1rem;
`;

interface Props {
  messages: LogMessage[];
}

const LogTable: FC<Props> = ({ messages }) => {
  const theme = useTheme();

  return (
    <ClassNames>
      {({ css: cssString }) => {
        const cssMap = {
          [LogLevel.Error]: cssString(color(theme, '#f2dede')),
          [LogLevel.Critical]: cssString(color(theme, '#f2dede')),
          [LogLevel.Warning]: cssString(color(theme, '#fcf8e3')),
        };

        return (
          <AutoSizer>
            {({ height, width }) => {
              let actualWidth = width;
              let actualHeight = height;
              if (process.env.NODE_ENV === 'test') {
                actualWidth = window.innerWidth;
                actualHeight = window.innerHeight;
              }
              return (
                <Table
                  css={table}
                  rowCount={messages.length}
                  rowHeight={20}
                  headerHeight={50}
                  width={actualWidth}
                  height={actualHeight}
                  rowGetter={({ index }) => messages[index]}
                  rowClassName={({ index }) => cssMap[messages[index]?.logLevel]}
                >
                  <Column label="Time" dataKey="timestamp" width={100} />
                  <Column label="Level" dataKey="logLevel" width={100} />
                  <Column label="Plugin" dataKey="plugin" width={100} />
                  <Column label="Task" dataKey="task" width={100} />
                  <Column label="Message" dataKey="message" width={100} flexGrow={1} />
                </Table>
              );
            }}
          </AutoSizer>
        );
      }}
    </ClassNames>
  );
};

export default LogTable;
