import styled from '@emotion/styled';
import theme from 'theme';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import SideNavEntry from 'core/layout/SideNavEntry';
import Version from 'core/layout/Version';

export const NestedSideNavEntry = styled(SideNavEntry)`
  padding-left: ${theme.spacing(0.4)}rem;
`;

export const NavDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    position: relative;
    background-color: ${theme.palette.secondary[900]};
    height: calc(100vh - 10rem);
    width: ${({ open }) => (open ? '100vw' : 0)};
    transition: ${theme.transitions.create('width')};
    border-right: none !important;

    ${theme.breakpoints.up('sm')} {
      height: calc(100vh - 5rem);
      width: ${({ open }) => (open ? '19rem' : '6rem')}
    }
  }
`;

export const DrawerInner = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NavVersion = styled(Version)`
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

export const NavList = styled(List)`
  width: inherit;
`;
