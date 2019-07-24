import React, { Component } from 'react';
import PropTypes from 'prop-types';
import semver from 'semver-compare';
import IconButton from 'material-ui/IconButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Wrapper, Line } from './styles';

class Version extends Component {
  static propTypes = {
    version: PropTypes.shape({
      api: PropTypes.string,
      flexget: PropTypes.string,
      latest: PropTypes.string,
    }).isRequired,
    getVersion: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  componentDidMount() {
    const { version, getVersion } = this.props;
    if (process.env.NODE_ENV === 'production' || !version.api) {
      getVersion();
    }
  }

  render() {
    const { version: { api, flexget, latest }, className } = this.props;
    return (
      <Wrapper className={className}>
        <Line>Version Info</Line>
        <Line>
Flexget:
          { flexget }
          {' '}
          {
          latest && semver(latest, flexget) === 1 && (
            <IconButton href="https://flexget.com/ChangeLog">
              <FontAwesomeIcon icon={['far', 'question-circle']} fixedWidth />
            </IconButton>
          ) }
        </Line>
        <Line>
API:
          { api }
        </Line>
      </Wrapper>
    );
  }
}

export default Version;
