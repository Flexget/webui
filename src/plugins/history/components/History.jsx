import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import HistoryList from 'plugins/history/components/HistoryList';
import FilterNav from 'plugins/history/components/FilterNav';
import { NoPaddingWrapper } from 'components/styles';

export default class HistoryPage extends Component {
  static propTypes = {
    getHistory: PropTypes.func.isRequired,
  };

  scroll = React.createRef()

  list = React.createRef()

  state = {
    grouping: 'time',
    sort: 'time',
    order: 'desc',
  };

  getHistory = page => this.props.getHistory({
    page,
    sort_by: this.state.sort,
    order: this.state.order,
    task: this.state.task,
  });

  restartLoader = () => {
    findDOMNode(this.scroll).scrollIntoView(); // eslint-disable-line react/no-find-dom-node
    this.getHistory(1);
    this.scroll.pageLoaded = 1;
  }

  handleChange = key => event => this.setState({ [key]: event.target.value }, this.restartLoader)

  toggleOrder = () => this.setState(({ order }) => ({
    order: (order === 'asc' ? 'desc' : 'asc'),
  }), this.restartLoader)

  render() {
    const { grouping } = this.state;

    return (
      <NoPaddingWrapper>
        <FilterNav
          handleChange={this.handleChange}
          toggleOrder={this.toggleOrder}
          {...this.state}
        />
        <HistoryList
          grouping={grouping}
          getHistory={this.getHistory}
          ref={{
            listRef: this.list,
            scrollRef: this.scroll,
          }}
        />
      </NoPaddingWrapper>
    );
  }
}
