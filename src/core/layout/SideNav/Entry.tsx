import React, { ComponentType, FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import theme from 'theme';

interface Props {
  onClick?: () => void;
  path?: string;
  Icon: ComponentType;
  className?: string;
  name: string;
}

export const colorClass = css`
  color: ${theme.palette.secondary[200]};
`;

export const navItem = css`
  ${colorClass};
  border-left: 3px solid transparent;
  cursor: pointer;

  &:hover {
    border-left: 3px solid ${theme.palette.primary[500]};
  }
`;

const SideNavEntry: FC<Props> = ({ onClick, path, Icon, name, className }) => {
  const item = (
    <ListItem css={[navItem, className]} onClick={onClick}>
      <ListItemIcon css={colorClass}>
        <Icon />
      </ListItemIcon>
      <ListItemText css={colorClass} disableTypography primary={name} />
    </ListItem>
  );

  if (path) {
    return <Link to={path}>{item}</Link>;
  }

  return item;
};

export default SideNavEntry;
