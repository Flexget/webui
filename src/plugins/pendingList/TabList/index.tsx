import React, { FC, useState, useCallback, useMemo } from 'react';
import Tab from '@material-ui/core/Tab';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ListContainer, actions, useGetLists } from 'plugins/pendingList/hooks/list';
import { useContainer } from 'unstated-next';
import { useInjectContent } from 'core/layout/AppBar/hooks';
import { Tabs } from '@material-ui/core';
import AddListDialog from './AddListDialog';
import { SelectedListID } from '../types';

interface Props {
  setPage: SetState<number>;
}

const TabList: FC<Props> = ({ setPage }) => {
  const [isOpen, setOpen] = useState(false);
  const [{ lists, listId }, dispatch] = useContainer(ListContainer);

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

  const content = useMemo(
    () => (
      <Tabs value={listId} variant="scrollable" scrollButtons="on" onChange={handleChange}>
        {lists.map(({ name, id }) => (
          <Tab label={name} value={id} key={id} />
        ))}
        <Tab icon={<AddCircleIcon />} value="add" />
      </Tabs>
    ),
    [handleChange, listId, lists],
  );

  useInjectContent(content);
  return <AddListDialog open={isOpen} onClose={() => setOpen(false)} />;
};

export default TabList;
