import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { createUltimatePagination } from 'react-ultimate-pagination';
import { Pagination, firstLink, lastLink, link, active } from './styles';

const page = ({ isActive, value, isDisabled, onClick }) => (
  <Button
    className={isActive ? [active, link] : link}
    onClick={onClick}
    disabled={isDisabled}
  >{value}</Button>
);

page.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
page.defaultProps = { isDisabled: false, isActive: false };

function makeLink(styles, text) {
  const button = props => (
    <Button
      className={props.isActive ? [active, ...styles] : styles}
      onClick={props.onClick}
      disabled={props.isActive ? true : props.isDisabled}
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

function wrapper(props) {
  return <Pagination>{props.children}</Pagination>;
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
