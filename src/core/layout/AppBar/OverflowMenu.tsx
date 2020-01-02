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
  IconButtonProps,
  MenuItemProps,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export type OverflowMenuProps = Omit<
  IconButtonProps &
    MenuItemProps & {
      name: string;
      onClick: () => void;
      Icon: ComponentType;
    },
  'button'
>;

interface Props {
  OverflowMenuIcon?: typeof SvgIcon;
  icons?: OverflowMenuProps[];
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

  let items: [OverflowMenuProps[], OverflowMenuProps[]];

  if (mdMatches) {
    items = [icons, []];
  } else if (smMatches) {
    items = [icons.slice(0, 2), icons.slice(2)];
  } else {
    items = [icons.slice(0, 1), icons.slice(1)];
  }

  return (
    <>
      {items[0].map(({ name, Icon, ...props }) => (
        <Tooltip key={name} title={name}>
          <IconButton
            aria-label={name}
            key={name}
            color="inherit"
            edge={items[1].length ? false : 'end'}
            {...props}
          >
            <Icon />
          </IconButton>
        </Tooltip>
      ))}
      {!!items[1].length && (
        <>
          <Tooltip title="View More">
            <IconButton
              edge="end"
              onClick={handleOverflowClick}
              aria-label="view more"
              color="inherit"
            >
              <OverflowMenuIcon />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleOverflowClose}>
            {items[1].map(({ name, Icon, ...props }) => (
              <MenuItem aria-label={name} key={name} {...props}>
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
