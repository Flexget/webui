import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from 'core/layout/Logo';
import Navbar from 'core/layout/Navbar';
import SideNav from 'core/layout/SideNav';
import LoadingBar from 'common/LoadingBar';
import ErrorStatus from 'common/ErrorStatus';
import InfoStatus from 'common/InfoStatus';
import { Wrapper, Main, Header, LogoWrapper, Nav, SideBar, Content } from './styles';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    sideBarOpen: (window.matchMedia && !!window.matchMedia('(min-width: 600px)').matches) || false,
  };

  toggleSideBar = () => {
    this.setState(({ sideBarOpen }) => ({
      sideBarOpen: !sideBarOpen,
    }));
  };

  render() {
    const { children } = this.props;
    const { sideBarOpen } = this.state;

    return (
      <Wrapper>
        <Header>
          <LogoWrapper>
            <Logo sideBarOpen={sideBarOpen} />
          </LogoWrapper>
          <Nav>
            <Navbar toggle={this.toggleSideBar} />
            <LoadingBar />
          </Nav>
        </Header>
        <Main>
          <SideBar>
            <SideNav sideBarOpen={sideBarOpen} toggle={this.toggleSideBar} />
          </SideBar>
          <Content open={sideBarOpen}>{children}</Content>
          <ErrorStatus />
          <InfoStatus />
        </Main>
      </Wrapper>
    );
  }
}

export default Layout;
