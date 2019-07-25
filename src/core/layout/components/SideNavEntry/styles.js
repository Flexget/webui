import styled, { css } from 'react-emotion';
import theme from 'theme';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const colorClass = css`color: ${theme.palette.secondary[200]};`;

export const SideNavIcon = styled(FontAwesomeIcon)`
  ${colorClass};
`;

export const SideNavText = styled(ListItemText)`
  ${colorClass};
`;

export const NavItem = styled(ListItem)`
  border-left: 3px solid transparent;
  cursor: pointer;

  &:hover {
    border-left: 3px solid ${theme.palette.primary[500]};
  }
`;
