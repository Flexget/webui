import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import HistoryList from 'plugins/history/HistoryList';
import FilterNav from 'plugins/history/FilterNav';
import { NoPaddingWrapper } from 'common/styles';

export default class HistoryPage extends Component {
  scroll = React.createRef();

  static propTypes = {
    getHistory: PropTypes.func.isRequired,
  };

  state = {
    grouping: 'time',
    sort: 'time',
    order: 'desc',
  };

  getHistory = page =>
    this.props.getHistory({
      page,
      sortBy: this.state.sort,
      order: this.state.order,
      task: this.state.task,
    });

  restartLoader = () => {
    findDOMNode(this.scroll.current).scrollIntoView(); // eslint-disable-line react/no-find-dom-node
    this.getHistory(1);
    this.scroll.current.pageLoaded = 1;
  };

  handleChange = key => event => this.setState({ [key]: event.target.value }, this.restartLoader);

  toggleOrder = () =>
    this.setState(
      ({ order }) => ({
        order: order === 'asc' ? 'desc' : 'asc',
      }),
      this.restartLoader,
    );

  render() {
    const { grouping } = this.state;

    return (
      <NoPaddingWrapper>
        <FilterNav
          handleChange={this.handleChange}
          toggleOrder={this.toggleOrder}
          {...this.state}
        />
        <HistoryList grouping={grouping} getHistory={this.getHistory} ref={this.scroll} />
      </NoPaddingWrapper>
    );
  }
}
