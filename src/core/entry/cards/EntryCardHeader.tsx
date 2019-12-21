import React, { FC, useState, useCallback } from 'react';
import { MoreVert } from '@material-ui/icons';
import { CardHeader, IconButton, Menu, MenuItem } from '@material-ui/core';

interface Option {
  label: string;
  url?: string;
}

interface Props {
  title: string;
  subheader: string;
  options: Option[];
}

const EntryCardHeader: FC<Props> = ({ title, subheader, options }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  const handleClose = useCallback(() => setAnchorEl(undefined), []);

  const subheaderProps = {
    variant: 'body2',
  };

  const titleProps = {
    variant: 'body1',
  };

  return (
    <>
      <CardHeader
        titleTypographyProps={titleProps}
        subheaderTypographyProps={subheaderProps}
        title={title}
        subheader={subheader}
        action={
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
        }
      />
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {options.map(({ label, url }) => !!url && <MenuItem key={url}>{label}</MenuItem>)}
      </Menu>
    </>
  );
};
export default EntryCardHeader;
