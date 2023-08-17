import React, { FC } from 'react';
import { gt } from 'semver';
import { css } from '@emotion/core';
import { IconButton, Theme } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import { cleanFlexgetVersion } from 'utils/version';
import { useVersion } from './hooks';

interface Props {
  className?: string;
}

const wrapper = (theme: Theme) => css`
  color: ${theme.palette.primary.main};
  opacity: 1;
  padding: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const Version: FC<Props> = ({ className }) => {
  const { loading, version } = useVersion();

  if (loading || !version) {
    // showProgress
    return null;
  }

  const { flexgetVersion, apiVersion, latestVersion } = version;

  const normalizedVersion = cleanFlexgetVersion(flexgetVersion);
  const normalizedLatest = cleanFlexgetVersion(latestVersion);

  return (
    <div css={wrapper} className={className}>
      <Typography>Version Info</Typography>
      <Typography>
        {`Flexget: ${flexgetVersion} `}
        {gt(normalizedLatest, normalizedVersion) && (
          <IconButton
            href="https://flexget.com/ChangeLog"
            color="inherit"
            size="small"
            aria-label="flexget update available"
          >
            <HelpOutlineIcon />
          </IconButton>
        )}
      </Typography>
      <Typography>{`Web UI: ${__VERSION__}`}</Typography>
      <Typography>{`API: ${apiVersion}`}</Typography>
    </div>
  );
};

export default Version;
