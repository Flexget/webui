import React, { FC, useState, useCallback } from 'react';
import Tab from '@material-ui/core/Tab';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SecondaryNav from 'common/SecondaryNav';
import { ListContiner, actions, useGetLists } from 'plugins/pendingList/hooks/list';
import AddListDialog from '../AddListDialog';
import { SelectedListID } from '../types';

interface Props {
  setPage: SetState<number>;
}

const TabList: FC<Props> = ({ setPage }) => {
  const [isOpen, setOpen] = useState(false);
  const [{ lists, listId }, dispatch] = ListContiner.useContainer();

  const handleChange = useCallback(
    (_, selected: SelectedListID) => {
      if (selected !== 'add') {
        dispatch(actions.selectList(selected));
        return setPage(0);
      }
      return setOpen(true);
    },
    [dispatch, setPage],
  );

  useGetLists();

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
        <Tab icon={<AddCircleIcon />} value="add" />
      </SecondaryNav>
      <AddListDialog open={isOpen} onClose={() => setOpen(false)} />
    </div>
  );
};

export default TabList;
