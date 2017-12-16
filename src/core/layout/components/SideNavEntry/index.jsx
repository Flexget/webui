import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItemIcon } from 'material-ui/List';
import {
  SideNavIcon,
  SideNavText,
  NavItem,
} from './styles';

const SideNavEntry = ({ onClick, path, icon, name, className }) => {
  const item = (
    <NavItem className={className} onClick={onClick}>
      <ListItemIcon><SideNavIcon icon={icon} fixedWidth /></ListItemIcon>
      <SideNavText disableTypography inset primary={name} />
    </NavItem>
  );

  if (path) {
    return <Link to={path}>{item}</Link>;
  }

  return item;
};

SideNavEntry.propTypes = {
  onClick: PropTypes.func.isRequired,
  path: PropTypes.string,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SideNavEntry.defaultProps = {
  className: '',
  path: '',
};

export default SideNavEntry;
