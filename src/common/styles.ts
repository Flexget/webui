import styled from '@emotion/styled';
import { css } from '@emotion/core';
import theme from 'theme';
import { Paper, Button as MUIButton } from '@material-ui/core';

export const PaperWrapper = styled(Paper)`
  padding: 2.4rem;
  display: flex;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  ${theme.breakpoints.up('sm')} {
    padding-top: 0;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const NoPaddingWrapper = styled.div`
  height: calc(100% + ${theme.typography.pxToRem(theme.spacing(2))});
  margin: -${theme.typography.pxToRem(theme.spacing(1))};
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.up('sm')} {
    height: calc(100% + ${theme.typography.pxToRem(theme.spacing(4))});
    margin: -${theme.typography.pxToRem(theme.spacing(2))};
  }
`;

export const backgroundColor = (color: string) => css`
  background-color: ${color};
  color: ${theme.palette.getContrastText(color)};
`;

interface ButtonProps {
  color: 'primary' | 'secondary';
  level: number;
  hoverLevel: number;
}

export const Button = styled<typeof MUIButton, ButtonProps>(MUIButton)`
  ${({ color, level }) => backgroundColor(theme.palette[color][level])};

  &:hover {
    ${({ color, hoverLevel }) => backgroundColor(theme.palette[color][hoverLevel])};
  }
`;
