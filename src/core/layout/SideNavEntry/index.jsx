import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavItem, colorClass } from './styles';

const SideNavEntry = ({ onClick, path, Icon, name, className }) => {
  const item = (
    <NavItem css={[colorClass, className]} onClick={onClick}>
      <ListItemIcon css={colorClass}>
        <Icon />
      </ListItemIcon>
      <ListItemText css={colorClass} disableTypography primary={name} />
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
  Icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SideNavEntry.defaultProps = {
  className: '',
  path: '',
};

export default SideNavEntry;
