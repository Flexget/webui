import React, { FC } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { List } from './types';

interface Props {
  handleChange: (_: any, selected: number) => void;
  listId?: number;
  lists: List[];
}

const TabList: FC<Props> = ({ listId, lists, handleChange }) => (
  <Tabs value={listId} variant="scrollable" scrollButtons="on" onChange={handleChange}>
    {lists.map(({ name, id }) => (
      <Tab label={name} value={id} key={id} />
    ))}
  </Tabs>
);

export default TabList;
