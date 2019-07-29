import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { ButtonWrapper } from './styles';

export default class SortList extends PureComponent {
  static propTypes = {
    onSortUpdate: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired,
  }

  handleChange = (event) => {
    const {
      onSortUpdate, sortBy, sortOrder, perPage,
    } = this.props;

    const data = {
      sortBy,
      sortOrder,
      perPage,
      [event.target.name]: event.target.value,
    };
    onSortUpdate(data.sortBy, data.sortOrder, data.perPage);
  };

  render() {
    const { sortBy, sortOrder, perPage } = this.props;

    return (
      <ButtonWrapper>
        <FormControl>
          <Select
            value={sortBy}
            onChange={this.handleChange}
            inputProps={{
              name: 'sortBy',
              id: 'sortBy',
            }}
          >
            <MenuItem value="added">Date Added</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="original_url">URL</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={sortOrder}
            onChange={this.handleChange}
            inputProps={{
              name: 'sortOrder',
              id: 'sortOrder',
            }}
          >
            <MenuItem value="desc">Desc</MenuItem>
            <MenuItem value="asc">Asc</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={perPage}
            onChange={this.handleChange}
            inputProps={{
              name: 'perPage',
              id: 'perPage',
            }}
          >
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </ButtonWrapper>
    );
  }
}
