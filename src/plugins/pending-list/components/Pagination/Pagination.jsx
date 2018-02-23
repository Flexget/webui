import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EntryShape } from 'plugins/pending-list/data/shapes';
import Pagination from 'common/Pagination';
import { PaginationWrapper } from './styles';

export default class ListPagination extends PureComponent {
  static propTypes = {
    listId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    entries: PropTypes.shape({
      page: PropTypes.number,
      totalCount: PropTypes.number,
      items: PropTypes.arrayOf(EntryShape),
    }).isRequired,
    getEntries: PropTypes.func.isRequired,
  }

  static defaultProps = {
    listId: false,
  }

  updatePage = page => this.props.getEntries({ page });

  render() {
    const { entries: { totalCount, page }, listId } = this.props;

    if (!listId) {
      return null;
    }

    const totalPages = Math.ceil(totalCount / 50);

    return (
      <PaginationWrapper>
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={this.updatePage}
          />
        )}
      </PaginationWrapper>
    );
  }
}
