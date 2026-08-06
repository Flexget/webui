import { FC, useState, useCallback, MouseEvent, useMemo, ComponentType } from 'react';
import {
  Theme,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import { css } from '@emotion/react';
import { Spacer } from 'common/styles';
import TextField from 'common/inputs/formik/TextField';
import { PlayArrow, Stop, FilterList, MoreVert, ClearAll } from '@mui/icons-material';
import { ReadyState } from 'core/api';
import { useDebounceFormikSubmit } from 'utils/hooks';

export const wrapper = (theme: Theme) => css`
  display: block;
  padding-bottom: ${theme.typography.pxToRem(parseFloat(theme.spacing(2)))};
  ${theme.breakpoints.up('sm')} {
    display: flex;
    align-items: baseline;
  }
`;

export const filterWrapper = css`
  display: flex;
  align-items: center;
`;

export const filterField = css`
  margin-left: 1rem;
  margin-right: 1rem;
`;

// TextField's helperText sits below the input and pulls the flex row's
// align-items: center down with it; nudge the icons back up to the
// input box's own center.
export const filterIcon = css`
  margin-top: -2.4rem;
`;

interface Props {
  readyState: ReadyState;
  connect: () => void;
  disconnect: () => void;
  clear: () => void;
}

interface StateOptions {
  onClick?: () => void;
  Icon: ComponentType;
  label: string;
  heading: string;
  disabled?: boolean;
}

const Header: FC<Props> = ({ readyState, connect, disconnect, clear }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const helperText = 'Supports operators and, or, (), and "str"';

  const stateMap: Record<ReadyState, StateOptions> = useMemo(
    () => ({
      [ReadyState.Open]: {
        onClick: disconnect,
        Icon: Stop,
        label: 'Stop',
        heading: 'Streaming',
      },
      [ReadyState.Connecting]: {
        label: 'Start',
        Icon: CircularProgress,
        heading: 'Connecting',
        disabled: true,
      },
      [ReadyState.Closed]: {
        onClick: connect,
        Icon: PlayArrow,
        label: 'Start',
        heading: 'Disconnected',
      },
    }),
    [connect, disconnect],
  );

  const { onClick, Icon, heading, label, disabled = false } = stateMap[readyState];

  const handleMenuClose = useCallback(() => setAnchorEl(undefined), []);
  const handleMenuOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  useDebounceFormikSubmit();
  return (
    <div css={wrapper}>
      <div>
        <Typography variant="h6">Server Log</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {heading}
        </Typography>
      </div>
      <Spacer />
      <div css={filterWrapper}>
        <FilterList css={filterIcon} />
        <TextField
          css={filterField}
          size="small"
          id="query"
          name="query"
          label="Filter"
          helperText={helperText}
        />
        <IconButton css={filterIcon} onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
      </div>
      <Menu id="log-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
        <MenuItem>
          <TextField id="lines" name="lines" label="Max Lines" type="number" />
        </MenuItem>
        <MenuItem onClick={clear}>
          <ListItemIcon>
            <ClearAll />
          </ListItemIcon>
          Clear
        </MenuItem>
        <MenuItem onClick={onClick} disabled={disabled}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          {label}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
