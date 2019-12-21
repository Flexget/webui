import React, { FC, useState, useCallback } from 'react';
import { MoreVert } from '@material-ui/icons';
import { IconButton, Menu, MenuItem } from '@material-ui/core';

interface Option {
  label: string;
  url?: string;
}

interface Props {
  options: Option[];
}

const LinkDropdown: FC<Props> = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(undefined), []);

  const handleMenuClick = useCallback((event: React.MouseEvent) => event.stopPropagation(), []);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {options.map(
          ({ label, url }) =>
            !!url && (
              <MenuItem
                key={url}
                component="a"
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                onClick={handleMenuClick}
              >
                {label}
              </MenuItem>
            ),
        )}
      </Menu>
    </>
  );
};
export default LinkDropdown;
