import styled from 'react-emotion';
import { css } from 'emotion';
import theme from 'theme';

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const EntryWrapper = styled.div`
  width: 100%;
  padding: ${theme.typography.pxToRem(theme.spacing.unit * 2)};

  ${theme.breakpoints.up('sm')} {
    width: 100%;
    padding: ${theme.typography.pxToRem(theme.spacing.unit * 2)};
  }

  ${theme.breakpoints.up('md')} {
    width: 50%;
    padding: ${theme.typography.pxToRem(theme.spacing.unit * 2)};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  > div {
    margin-left: 2em;
    margin-right: 2em;
  }
`;

export const pagination = css`
  position: static;
`;
