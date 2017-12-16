import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'material-ui/Tabs';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import SecondaryNav from 'components/SecondaryNav';
import { ListShape } from 'plugins/pending-list/data/shapes';
import AddListDialog from '../AddListDialog';

class TabList extends PureComponent {
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    selectList: PropTypes.func.isRequired,
    lists: PropTypes.arrayOf(ListShape).isRequired,
    listId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  }

  static defaultProps = {
    listId: false,
  }

  state = {
    addDialogOpen: false,
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
    if (value !== 'add') {
      return this.props.selectList(value);
    }
    return this.openDialog();
  }

  openDialog = () => this.setState({ addDialogOpen: true })
  closeDialog = () => this.setState({ addDialogOpen: false })

  render() {
    const { listId, lists } = this.props;
    const { addDialogOpen } = this.state;

    return (
      <div>
        <SecondaryNav
          value={listId}
          scrollable
          scrollButtons="on"
          onChange={this.handleChange}
          tabs
        >
          {lists.map(({ name, id }) => <Tab label={name} value={id} key={id} />)}
          <Tab
            icon={<FontAwesomeIcon icon="plus-circle" />}
            value="add"
          />
        </SecondaryNav>
        <AddListDialog
          open={addDialogOpen}
          onClose={this.closeDialog}
        />
      </div>
    );
  }
}

export default TabList;
