import React, { useEffect, useState } from 'react';
import semver from 'semver-compare';
import styled from '@emotion/styled';
import theme from 'theme';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFlexgetAPI } from 'core/api';

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

const Line = styled.p`
  margin: 0;
`;

const useVersion = () => {
  const [version, setVersion] = useState<VersionResponse | undefined>();
  const [{ loading }, getVersion] = useFlexgetAPI<VersionResponse>('/server/version');

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
        {semver(latestVersion, flexgetVersion) === 1 && (
          <IconButton href="https://flexget.com/ChangeLog">
            <FontAwesomeIcon icon={['far', 'question-circle']} fixedWidth />
          </IconButton>
        )}
      </Line>
      <Line>{`API: ${apiVersion}`}</Line>
    </Wrapper>
  );
};

export default Version;
