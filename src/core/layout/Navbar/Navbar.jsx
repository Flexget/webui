import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Spacer } from 'common/styles';
import {
  MenuIcon,
  NavAppBar,
  NavToolbar,
  NavIcon,
} from './styles';

export default class Navbar extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    reloadServer: PropTypes.func.isRequired,
    shutdownServer: PropTypes.func.isRequired,
    titleMap: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    menuOpen: false,
    shutdownPrompt: false,
  };

  handleMenuRequestClose = () => this.setState({
    menuOpen: false,
    anchorEl: undefined,
  })

  handleMenuClick = event => this.setState({
    menuOpen: true,
    anchorEl: event.currentTarget,
  })

  handleReloadClick = () => {
    const { reloadServer } = this.props;
    reloadServer();
    this.handleMenuRequestClose();
  }

  handleShutdownPromptClick = () => {
    this.setState({ shutdownPrompt: true });
    this.handleMenuRequestClose();
  }

  handleShutdownClick = () => {
    const { shutdownServer } = this.props;
    shutdownServer();
    this.handleShutdownRequestClose();
  }

  handleShutdownRequestClose = () => this.setState({
    shutdownPrompt: false,
  });

  render() {
    const {
      toggle, logout, pathname, titleMap,
    } = this.props;
    const { anchorEl, menuOpen, shutdownPrompt } = this.state;

    return (
      <NavAppBar>
        <NavToolbar>
          <NavIcon onClick={toggle}>
            <FontAwesomeIcon icon="bars" fixedWidth />
          </NavIcon>
          <Typography variant="h6" color="inherit">
            {titleMap[pathname]}
          </Typography>
          <Spacer />
          <Link to="/config">
            <NavIcon aria-label="Config">
              <FontAwesomeIcon icon="pencil-alt" fixedWidth />
            </NavIcon>
          </Link>
          <Link to="/log">
            <NavIcon aria-label="Log">
              <FontAwesomeIcon icon="book" fixedWidth />
            </NavIcon>
          </Link>
          <NavIcon
            aria-label="Manage"
            onClick={this.handleMenuClick}
          >
            <FontAwesomeIcon icon="cog" fixedWidth />
          </NavIcon>
          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={this.handleMenuRequestClose}
          >
            <MenuItem onClick={this.handleReloadClick}>
              <MenuIcon icon="sync" fixedWidth />
              Reload
            </MenuItem>
            <MenuItem onClick={this.handleShutdownPromptClick}>
              <MenuIcon icon="power-off" fixedWidth />
              Shutdown
            </MenuItem>
            <MenuItem>
              <MenuIcon icon="database" fixedWidth />
              Database
            </MenuItem>
            <MenuItem onClick={logout}>
              <MenuIcon icon="sign-out-alt" fixedWidth />
              Logout
            </MenuItem>
          </Menu>
          <Dialog open={shutdownPrompt} onClose={this.handleShutdownRequestClose}>
            <DialogTitle>Shutdown</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to shutdown FlexGet?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleShutdownRequestClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleShutdownClick} color="primary">
                Shutdown
              </Button>
            </DialogActions>
          </Dialog>
        </NavToolbar>
      </NavAppBar>
    );
  }
}
