import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import SideNavEntry from 'core/layout/SideNavEntry';
import { NestedSideNavEntry, DrawerInner, NavVersion, NavList, NavDrawer } from './styles';

export default class SideNav extends Component {
  static propTypes = {
    sideBarOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.string,
        path: PropTypes.string,
        children: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.string,
            path: PropTypes.string,
          }),
        ),
      }),
    ).isRequired,
  };

  state = {
    open: {},
  };

  componentWillReceiveProps(nextProps) {
    const { sideBarOpen } = this.props;
    if (sideBarOpen && !nextProps.sideBarOpen) {
      this.setState({ open: {} });
    }
  }

  toggleOnMobile = () => {
    const { toggle } = this.props;
    if (window.matchMedia && window.matchMedia('(max-width: 600px)').matches) {
      toggle();
    }
  };

  handleOnClick = ({ path, name }) => {
    const { sideBarOpen, toggle } = this.props;
    if (path) {
      return this.toggleOnMobile;
    }
    return () => {
      this.setState(({ open }) => ({
        open: {
          ...open,
          [name]: !open[name],
        },
      }));

      if (!sideBarOpen) {
        toggle();
      }
    };
  };

  renderNavItems() {
    const { routes } = this.props;
    const { open } = this.state;

    return routes.reduce((items, props) => {
      const list = [
        ...items,
        <SideNavEntry key={props.path} onClick={this.handleOnClick(props)} {...props} />,
      ];
      if (props.children) {
        const collaspe = (
          <Collapse
            in={open[props.label]}
            transitionDuration="auto"
            unmountOnExit
            key={`${props.label}-collapse`}
          >
            {props.children.map(child => (
              <NestedSideNavEntry key={child.path} onClick={this.handleOnClick(child)} {...child} />
            ))}
          </Collapse>
        );
        list.push(collaspe);
      }
      return list;
    }, []);
  }

  render() {
    const { sideBarOpen } = this.props;
    return (
      <NavDrawer open={sideBarOpen} variant="permanent">
        <DrawerInner>
          <NavList>{this.renderNavItems()}</NavList>
          <NavVersion hide={!sideBarOpen} />
        </DrawerInner>
      </NavDrawer>
    );
  }
}
