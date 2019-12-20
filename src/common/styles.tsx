import React, { forwardRef } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import st, { CreateStyled } from '@emotion/styled';
import { css } from '@emotion/core';
import { Paper, Theme } from '@material-ui/core';

const styled = st as CreateStyled<Theme>;

export const PaperWrapper = styled(Paper)`
  padding: 2.4rem;
  display: flex;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding-top: 0;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const NoPaddingWrapper = styled.div`
  height: calc(100% + ${({ theme }) => theme.typography.pxToRem(theme.spacing(2))});
  margin: -${({ theme }) => theme.typography.pxToRem(theme.spacing(1))};
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: calc(100% + ${({ theme }) => theme.typography.pxToRem(theme.spacing(4))});
    margin: -${({ theme }) => theme.typography.pxToRem(theme.spacing(2))};
  }
`;

export const backgroundColor = (theme: Theme, color: string) => css`
  background-color: ${color};
  color: ${theme.palette.getContrastText(color)};
`;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));
