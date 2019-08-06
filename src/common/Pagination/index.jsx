import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { createUltimatePagination } from 'react-ultimate-pagination';
import {
  Pagination, firstLink, lastLink, link, active,
} from './styles';

const page = ({
  isActive, value, isDisabled, onClick,
}) => (
  <Button
    className={isActive ? [active, link].join(' ') : link}
    onClick={onClick}
    disabled={isDisabled}
  >
    {value}
  </Button>
);

page.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
page.defaultProps = { isDisabled: false, isActive: false };

function makeLink(styles, text) {
  const button = ({ isActive, onClick, isDisabled }) => (
    <Button
      className={isActive ? [active, ...styles].join(' ') : styles.join(' ')}
      onClick={onClick}
      disabled={isActive ? true : isDisabled}
    >
      {text}
    </Button>
  );

  button.propTypes = {
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };
  button.defaultProps = { isDisabled: false, isActive: false };

  return button;
}

function wrapper({ children }) {
  return <Pagination>{children}</Pagination>;
}

wrapper.propTypes = { children: PropTypes.node.isRequired };

export default createUltimatePagination({
  itemTypeToComponent: {
    PAGE: page,
    ELLIPSIS: makeLink([link], '...'),
    FIRST_PAGE_LINK: makeLink([firstLink, link], '<<'),
    PREVIOUS_PAGE_LINK: makeLink([link], '<'),
    NEXT_PAGE_LINK: makeLink([link], '>'),
    LAST_PAGE_LINK: makeLink([lastLink, link], '>>'),
  },
  WrapperComponent: wrapper,
});
