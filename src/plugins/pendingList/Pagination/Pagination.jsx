import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Pagination from 'common/Pagination';
import FlexgetEntry from 'common/FlexGetEntry';
import { PaginationWrapper } from './styles';


export default class ListPagination extends PureComponent {
  static propTypes = {
    entries: PropTypes.shape({
      page: PropTypes.number,
      totalCount: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.instanceOf(FlexgetEntry)),
    }).isRequired,
    onPageUpdate: PropTypes.func.isRequired,
    perPage: PropTypes.number.isRequired,
  }

  onPageUpdate = page => this.props.onPageUpdate(Number(page));

  render() {
    const { entries: { totalCount, page }, perPage } = this.props;

    if (!totalCount) {
      return null;
    }

    const totalPages = Math.ceil(totalCount / perPage);

    return (
      <PaginationWrapper>
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={this.onPageUpdate}
          />
        )}
      </PaginationWrapper>
    );
  }
}
