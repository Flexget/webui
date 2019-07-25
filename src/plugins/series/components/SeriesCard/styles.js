import styled from 'react-emotion';
import CardMedia from '@material-ui/core/CardMedia';
import theme from 'theme';

export const Media = styled(CardMedia)`
  border-bottom: 0.1rem solid ${theme.palette.grey[300]};
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  visibility: hidden;
`;
