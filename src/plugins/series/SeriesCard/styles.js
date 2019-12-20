import styled from '@emotion/styled';
import { CardMedia } from '@material-ui/core';

export const Media = styled(CardMedia)`
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  visibility: hidden;
`;
