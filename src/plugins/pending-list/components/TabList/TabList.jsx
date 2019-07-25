import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
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
    const { getLists } = this.props;
    getLists();
  }

  componentWillReceiveProps({ lists }) {
    const { selectList, lists: prevLists } = this.props;
    if (prevLists.length === 0 && lists.length !== 0) {
      selectList(lists[0].id);
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
          variant="scrollable"
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
