import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const CustomTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField error={touched && error} {...input} {...custom} />
);

CustomTextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default CustomTextField;
