import styled from '@emotion/styled';
import theme from 'core/theme';
import { CardMedia } from '@material-ui/core';

export const Media = styled(CardMedia)`
  border-bottom: 0.1rem solid ${theme.palette.grey[300]};
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  visibility: hidden;
`;
