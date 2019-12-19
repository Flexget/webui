import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, TextField } from '@material-ui/core';

const grey = theme => css`
  color: ${theme.palette.grey[600]};
`;

export const Wrapper = styled.div`
  display: block;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: flex;
    align-items: baseline;
  }
`;

export const GreyIcon = styled(FontAwesomeIcon)`
  ${({ theme }) => grey(theme)};
`;

export const GreyClickableIcon = styled(GreyIcon)`
  cursor: pointer;
`;

export const GreyType = styled(Typography)`
  ${({ theme }) => grey(theme)};
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const TextFieldWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

export const FilterField = styled(TextField)`
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const MenuIcon = styled(FontAwesomeIcon)`
  margin-right: 3rem;
`;
