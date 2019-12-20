import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { Icon } from '@material-ui/core';

export const RotatingIcon = styled(Icon)`
  transition: ${({ theme }) => theme.transitions.create()};
  transform: ${({ rotate }) => rotate && 'rotate(180deg)'};
`;

export const Padded = styled.div`
  padding: 0.5rem 2rem 0.5rem;
`;

export const textField = css`
  width: 7.5rem;
`;
