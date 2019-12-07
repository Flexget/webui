import React, { FC, useState } from 'react';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SecondaryNav from 'common/SecondaryNav';
import { ListContiner, actions } from 'plugins/pendingList/hooks/list';
import AddListDialog from '../AddListDialog';
import { SelectedListID } from '../types';


const TabList: FC<{}> = () => {
  const [isOpen, setOpen] = useState(false);
  const [{ lists, listId }, dispatch] = ListContiner.useContainer();

  const handleChange = (_, selected: SelectedListID) => {
    if (selected !== 'add') {
      return dispatch(actions.selectList(selected));
    }
    return setOpen(true);
  };

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
      <AddListDialog open={isOpen} onClose={() => setOpen(false)} />
    </div>
  );
};

export default TabList;
