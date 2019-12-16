import React, { ComponentType, FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon, Theme } from '@material-ui/core';

interface Props {
  onClick?: () => void;
  path?: string;
  Icon: ComponentType;
  className?: string;
  name: string;
}

export const colorClass = (theme: Theme) => css`
  color: ${theme.palette.secondary.light};
`;

const navItem = (theme: Theme) => css`
  ${colorClass(theme)};
  border-left: 3px solid transparent;
  cursor: pointer;

  &:hover {
    border-left: 3px solid ${theme.palette.primary.main};
  }
`;

const SideNavEntry: FC<Props> = ({ onClick, path, Icon, name, className }) => {
  const item = (
    <ListItem css={theme => [navItem(theme), className]} onClick={onClick}>
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
