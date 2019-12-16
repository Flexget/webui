import React, { useEffect, useState } from 'react';
import semver from 'semver-compare';
import { css } from '@emotion/core';
import { IconButton, Theme } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import { useFlexgetAPI } from 'core/api';
import { useGlobalStatus } from 'core/status/hooks';

interface Props {
  className?: string;
}

interface VersionResponse {
  apiVersion: string;
  flexgetVersion: string;
  latestVersion: string;
}

const wrapper = (theme: Theme) => css`
  color: ${theme.palette.primary.main};
  opacity: 1;
`;

const useVersion = () => {
  const [version, setVersion] = useState<VersionResponse>();
  const [{ loading, error }, getVersion] = useFlexgetAPI<VersionResponse>('/server/version');
  useGlobalStatus(loading, error);

  useEffect(() => {
    const fn = async () => {
      const resp = await getVersion();
      if (resp.ok) {
        setVersion(resp.data);
      }
    };
    fn();
  }, [getVersion]);

  return { loading, version };
};

const Version: React.FC<Props> = ({ className }) => {
  const { loading, version } = useVersion();

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
