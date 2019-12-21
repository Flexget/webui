import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, TextField, Typography, IconButton, ListItemIcon } from '@material-ui/core';
import { FilterList, MoreVert, Stop, PlayArrow, ClearAll } from '@material-ui/icons';
import { Wrapper, Spacer, TextFieldWrapper, FilterField } from './styles';

const ENTER_KEY = 13;

class Header extends Component {
  static propTypes = {
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    connected: PropTypes.bool.isRequired,
    clearLogs: PropTypes.func.isRequired,
  };

  state = {
    open: false,
    lines: '200',
    query: '',
  };

  componentDidMount() {
    this.reload();
  }

  componentWillUnmount() {
    const { stop } = this.props;
    stop();
  }

  reload = () => {
    const { connected, start, stop } = this.props;
    const { lines, query } = this.state;

    if (connected) {
      stop();
    }
    start({ lines, query });
  };

  clearLogs = () => this.props.clearLogs();

  handleLines = event => this.setState({ lines: event.target.value });

  handleQuery = event => this.setState({ query: event.target.value });

  handleKeyPress = event => event.which === ENTER_KEY && this.reload();

  handleRequestClose = () =>
    this.setState({
      open: false,
      anchorEl: undefined,
    });

  handleMenuClick = event =>
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });

  render() {
    const { connected, stop } = this.props;
    const { anchorEl, open, query, lines } = this.state;
    const helperText = 'Supports operators and, or, (), and "str"';
    const { onClick, Icon, text } = connected
      ? {
          onClick: stop,
          Icon: Stop,
          text: 'Stop',
        }
      : {
          onClick: this.reload,
          Icon: PlayArrow,
          text: 'Start',
        };

    return (
      <Wrapper>
        <div>
          <Typography variant="h6">Server Log</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {connected ? 'Streaming' : 'Disconnected'}
          </Typography>
        </div>
        <Spacer />
        <TextFieldWrapper>
          <FilterList />
          <FilterField
            id="filter"
            label="Filter"
            value={query}
            onChange={this.handleQuery}
            inputProps={{
              onKeyPress: this.handleKeyPress,
            }}
            helperText={helperText}
          />
          <IconButton onClick={this.handleMenuClick}>
            <MoreVert />
          </IconButton>
        </TextFieldWrapper>
        <Menu id="log-menu" anchorEl={anchorEl} open={open} onClose={this.handleRequestClose}>
          <MenuItem>
            <TextField
              id="lines"
              label="Max Lines"
              value={lines}
              onChange={this.handleLines}
              type="number"
              inputProps={{
                onKeyPress: this.handleKeyPress,
              }}
            />
          </MenuItem>
          <MenuItem onClick={this.clearLogs}>
            <ListItemIcon>
              <ClearAll />
            </ListItemIcon>
            Clear
          </MenuItem>
          <MenuItem onClick={onClick}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            {text}
          </MenuItem>
        </Menu>
      </Wrapper>
    );
  }
}

export default Header;
