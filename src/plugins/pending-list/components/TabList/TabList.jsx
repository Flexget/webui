import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'material-ui/Tabs';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import SecondaryNav from 'components/SecondaryNav';
import { ListShape } from 'plugins/pending-list/data/shapes';

class TabList extends PureComponent {
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    selectList: PropTypes.func.isRequired,
    lists: PropTypes.arrayOf(ListShape).isRequired,
    listId: PropTypes.number,
  }

  static defaultProps = {
    listId: null,
  }

  componentDidMount() {
    this.props.getLists();
  }

  componentWillReceiveProps({ lists }) {
    if (this.props.lists.length === 0 && lists.length !== 0) {
      this.props.selectList(lists[0].id);
    }
  }

  handleChange = (event, value) => {
    if (value !== '') {
      return this.selectList(value);
    }
    return null;
    // OPEN ADD MODAL
  }

  render() {
    const { listId, lists } = this.props;

    return (
      <SecondaryNav
        value={listId}
        scrollable
        scrollButtons="on"
        onChange={this.handleChange}
        tabs
      >
        {lists.map(({ name, id }) => <Tab label={name} value={id} />)}
        <Tab
          icon={<FontAwesomeIcon icon="plus-circle" />}
          value=""
        />
      </SecondaryNav>
    );
  }
}

export default TabList;
