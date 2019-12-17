import React, { FC, useCallback, ComponentType, useState } from 'react';
import {
  SvgIcon,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export interface OverflowMenuIconProps {
  name: string;
  onClick: () => void;
  Icon: ComponentType;
}

interface Props {
  OverflowMenuIcon?: typeof SvgIcon;
  icons?: OverflowMenuIconProps[];
}

const OverflowMenu: FC<Props> = ({ OverflowMenuIcon = MoreVert, icons = [] }) => {
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const handleOverflowClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  const handleOverflowClose = useCallback(() => setAnchorEl(undefined), []);

  let items: [OverflowMenuIconProps[], OverflowMenuIconProps[]];

  if (mdMatches) {
    items = [icons, []];
  } else if (smMatches) {
    items = [icons.slice(0, 2), icons.slice(2)];
  } else {
    items = [icons.slice(0, 1), icons.slice(1)];
  }

  return (
    <>
      {items[0].map(({ onClick, name, Icon }) => (
        <Tooltip key={name} title={name}>
          <IconButton onClick={onClick} aria-label={name} key={name} color="inherit">
            <Icon />
          </IconButton>
        </Tooltip>
      ))}
      {!!items[1].length && (
        <>
          <Tooltip title="View More">
            <IconButton onClick={handleOverflowClick} aria-label="view more" color="inherit">
              <OverflowMenuIcon />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleOverflowClose}>
            {items[1].map(({ onClick, name, Icon }) => (
              <MenuItem onClick={onClick} aria-label={name} key={name}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                {name}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  );
};

export default OverflowMenu;
