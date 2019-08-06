import * as React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { request, action } from 'utils/actions';
import Tab from '@material-ui/core/Tab';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import SecondaryNav from 'common/SecondaryNav';
import { useOverlayState } from 'utils/hooks';
import AddListDialog from '../AddListDialog';
import { List, SelectedListID } from '../state/types';
import { GET_LISTS, SELECT_LIST } from '../state/actions';

interface SelectorProps {
  lists: List[];
  listId?: SelectedListID;
}

const usePendingList = openDialog => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(request(GET_LISTS));
  }, [dispatch]);
  const handleChange = React.useCallback(
    (_, selected: SelectedListID) => {
      if (selected !== 'add') {
        return dispatch(action(SELECT_LIST, { selected }));
      }
      return openDialog();
    },
    [dispatch, openDialog],
  );

  const { lists, listId }: SelectorProps = useSelector(
    ({ pendingList }) => ({
      lists: pendingList.list,
      listId: pendingList.selected,
    }),
    shallowEqual,
  );

  return { handleChange, lists, listId };
};

const TabList: React.FC<{}> = () => {
  const addDialog = useOverlayState(false);
  const { handleChange, lists, listId } = usePendingList(addDialog.openOverlay);

  return (
    <div>
      <SecondaryNav
        value={listId}
        variant="scrollable"
        scrollButtons="on"
        onChange={handleChange}
        tabs
      >
        {lists.map(({ name, id }) => (
          <Tab label={name} value={id} key={id} />
        ))}
        <Tab icon={<FontAwesomeIcon icon="plus-circle" />} value="add" />
      </SecondaryNav>
      <AddListDialog open={addDialog.isOpen} onClose={addDialog.closeOverlay} />
    </div>
  );
};

export default TabList;
