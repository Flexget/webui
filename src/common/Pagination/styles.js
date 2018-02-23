import styled from 'react-emotion';
import { css } from 'emotion';
import theme from 'theme';


export const link = css`
  font-size: 16px;
  margin: 0 0 5px;
  padding: 2px 12px;
  background-color: ${theme.palette.primary[600]}
  min-width: 50px;
  max-width: 50px;
  border-radius: 0;
  border-right: 1px solid rgba(0,0,0,.25);
  &:hover {
    background-color: ${theme.palette.primary[300]}
  }
`;

export const active = css`
  background-color: ${theme.palette.primary[300]}
`;

export const firstLink = css`
  border-radius: 10px 0 0 10px;
`;

export const lastLink = css`
  border-radius: 0 10px 10px 0;
  border-right: none;
`;

export const Pagination = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
`;
