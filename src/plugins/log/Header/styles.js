import styled from '@emotion/styled';
import { TextField } from '@material-ui/core';

export const Wrapper = styled.div`
  display: block;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: flex;
    align-items: baseline;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const TextFieldWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterField = styled(TextField)`
  margin-left: 1rem;
  margin-right: 1rem;
`;
