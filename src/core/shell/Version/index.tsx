import React from 'react';
import semver from 'semver-compare';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/core';
import { useFetchData } from 'core/request';
import theme from 'theme';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  css: SerializedStyles;
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

const Version: React.FC<Props> = ({ css }) => {
  const [state] = useFetchData<VersionResponse>('/server/version');

  if (state.isLoading) {
    // showProgress
    return null;
  }

  if (state.error) {
    return null;
  }

  const { flexgetVersion, apiVersion, latestVersion } = state.resp.data;

  return (
    <Wrapper css={css}>
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
