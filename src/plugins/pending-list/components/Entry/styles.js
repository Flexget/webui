import styled, { css } from 'react-emotion';
import Card from 'material-ui/Card';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import theme from 'theme';

export const ActionIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.typography.pxToRem(theme.spacing.unit)};
  font-size: 1.6rem;
`;

export const content = css`
  width: calc(100% - 4.8rem);
`;

export const subheader = css`
  word-wrap: break-word;
`;

export const EntryCard = styled(Card)`
  height: 280px;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
`;
