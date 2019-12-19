import React, { FC, useMemo } from 'react';
import { useInjectContent } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { GroupByFields, SortByFields } from './types';
import FilterNav from './FilterNav';

interface Props {
  order: Direction;
  grouping: GroupByFields;
  sort: SortByFields;
  toggleOrder: () => void;
  handleChange: (key: string) => (e: any) => void;
}

const Filter: FC<Props> = props => {
  useInjectContent(useMemo(() => <FilterNav {...props} />, [props]));

  return null;
};

export default Filter;
