import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Paper, Theme } from '@mui/material';

export const PaperWrapper = styled(Paper)<{ elevation?: number }>`
  padding: 2.4rem;
  display: flex;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const NoPaddingWrapper = styled.div`
  height: calc(100% + ${({ theme }) => theme.typography.pxToRem(parseFloat(theme.spacing(2)))});
  margin: -${({ theme }) => theme.typography.pxToRem(parseFloat(theme.spacing(1)))};
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: calc(100% + ${({ theme }) => theme.typography.pxToRem(parseFloat(theme.spacing(4)))});
    margin: -${({ theme }) => theme.typography.pxToRem(parseFloat(theme.spacing(2)))};
  }
`;

export const dialogFields = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const backgroundColor = (theme: Theme, color: string) => css`
  background-color: ${color};
  color: ${theme.palette.getContrastText(color)};
`;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <RouterLink ref={ref} {...props} />
));
