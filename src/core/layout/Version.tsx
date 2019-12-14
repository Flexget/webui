import React, { useEffect, useState } from 'react';
import semver from 'semver-compare';
import styled from '@emotion/styled';
import theme from 'theme';
import { IconButton } from '@material-ui/core';
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

const Wrapper = styled.div`
  color: ${theme.palette.primary[800]};
`;

const Line = styled(Typography)`
  margin: 0;
`;

const useVersion = () => {
  const [version, setVersion] = useState<VersionResponse | undefined>();
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
    <Wrapper className={className}>
      <Line>Version Info</Line>
      <Line>
        {`Flexget: ${flexgetVersion} `}
        {semver(latestVersion, flexgetVersion) !== 1 && (
          <IconButton href="https://flexget.com/ChangeLog" color="inherit" size="small">
            <HelpOutlineIcon />
          </IconButton>
        )}
      </Line>
      <Line>{`API: ${apiVersion}`}</Line>
    </Wrapper>
  );
};

export default Version;
