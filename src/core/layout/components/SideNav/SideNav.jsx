import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import Drawer from 'material-ui/Drawer';
import SideNavEntry from 'core/layout/components/SideNavEntry';
import {
  NestedSideNavEntry,
  DrawerInner,
  NavVersion,
  NavList,
  drawerPaper,
} from './styles';

export default class SideNav extends Component {
  static propTypes = {
    sideBarOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    routes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      path: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.string,
        path: PropTypes.string,
      })),
    })).isRequired,
  };

  state = {
    open: {},
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.sideBarOpen && !nextProps.sideBarOpen) {
      this.setState({ open: {} });
    }
  }

  toggleOnMobile = () => {
    if (
      window.matchMedia &&
      window.matchMedia('(max-width: 600px)').matches
    ) {
      this.props.toggle();
    }
  }

  handleOnClick = ({ path, name }) => {
    if (path) {
      return this.toggleOnMobile;
    }
    return () => {
      this.setState({
        open: {
          ...this.state.open,
          [name]: !this.state.open[name],
        },
      });

      if (!this.props.sideBarOpen) {
        this.props.toggle();
      }
    };
  }

  renderNavItems() {
    return this.props.routes.reduce((items, props) => {
      const list = [
        ...items,
        <SideNavEntry
          key={props.path}
          onClick={this.handleOnClick(props)}
          {...props}
        />,
      ];
      if (props.children) {
        list.push(
          <Collapse
            in={this.state.open[props.label]}
            transitionDuration="auto"
            unmountOnExit
            key={`${props.label}-collapse`}
          >
            {props.children.map(child => (
              <NestedSideNavEntry
                key={child.path}
                onClick={this.handleOnClick(child)}
                {...child}
              />
            ))}
          </Collapse>
        );
      }
      return list;
    }, []);
  }

  render() {
    const { sideBarOpen } = this.props;
    return (
      <Drawer
        open={sideBarOpen}
        type="permanent"
        classes={{
          paper: drawerPaper(sideBarOpen),
        }}
      >
        <DrawerInner>
          <NavList>{this.renderNavItems()}</NavList>
          <NavVersion hide={!sideBarOpen} />
        </DrawerInner>
      </Drawer>
    );
  }
}
