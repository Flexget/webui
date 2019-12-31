import React, { FC, useRef, useEffect, useCallback } from 'react';
import { findDOMNode } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { NoPaddingWrapper } from 'common/styles';
import { useMergeState } from 'utils/hooks';
import { Direction } from 'utils/query';
import { Formik } from 'formik';
import InfiniteScroll from 'react-infinite-scroller';
import FilterNav from './FilterNav';
import HistoryList from './HistoryList';
import { GroupByFields, SortByFields, GetHistoryOptions } from './types';

const History: FC = () => {
  useInjectPageTitle('History');
  const scroll = useRef<InfiniteScroll>(null);
  const [options, setOptions] = useMergeState<GetHistoryOptions>({
    page: 1,
    grouping: GroupByFields.Time,
    sort: SortByFields.Time,
    order: Direction.Desc,
    task: '',
  });

  useEffect(() => {
    if (scroll.current && options.page === 1) {
      const node = findDOMNode(scroll.current); // eslint-disable-line react/no-find-dom-node

      if (node && 'scrollIntoView' in node) {
        node.scrollIntoView();
      }
      scroll.current.pageLoaded = 1;
    }
  }, [options.page]);

  const loadMore = useCallback((page: number) => setOptions({ page }), [setOptions]);

  return (
    <NoPaddingWrapper>
      <Formik
        initialValues={options}
        onSubmit={values =>
          setOptions({
            ...values,
            page: 1,
          })
        }
      >
        <FilterNav />
      </Formik>
      <HistoryList options={options} ref={scroll} loadMore={loadMore} />
    </NoPaddingWrapper>
  );
};

export default hot(History);
