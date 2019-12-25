import React from 'react';
import { useContainer } from 'unstated-next';
import semver from 'semver-compare';
import { css } from '@emotion/core';
import { IconButton, Theme } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import { VersionContainer } from './hooks';

interface Props {
  className?: string;
}

const wrapper = (theme: Theme) => css`
  color: ${theme.palette.primary.main};
  opacity: 1;
  padding: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const Version: React.FC<Props> = ({ className }) => {
  const { loading, version } = useContainer(VersionContainer);
  if (loading || !version) {
    // showProgress
    return null;
  }

  const { flexgetVersion, apiVersion, latestVersion } = version;

  return (
    <div css={wrapper} className={className}>
      <Typography>Version Info</Typography>
      <Typography>
        {`Flexget: ${flexgetVersion} `}
        {semver(latestVersion, flexgetVersion) !== 1 && (
          <IconButton href="https://flexget.com/ChangeLog" color="inherit" size="small">
            <HelpOutlineIcon />
          </IconButton>
        )}
      </Typography>
      <Typography>{`API: ${apiVersion}`}</Typography>
    </div>
  );
};

export default Version;
