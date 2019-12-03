import React from 'react';
import semver from 'semver-compare';
import styled from '@emotion/styled';
import { useFlexgetAPI } from 'utils/hooks/api';
import theme from 'theme';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const Version: React.FC<Props> = ({ className }) => {
  const { loading, error, data } = useFlexgetAPI<VersionResponse>('/server/version', []);

  if (loading || !data) {
    // showProgress
    return null;
  }

  if (error) {
    return null;
  }

  const { flexgetVersion, apiVersion, latestVersion } = data;

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
