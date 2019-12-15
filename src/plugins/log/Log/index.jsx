import React from 'react';
import { hot } from 'react-hot-loader/root';
import { PaperWrapper } from 'common/styles';
import { useInjectPageTitle } from 'core/layout/Navbar/hooks';
import Header from '../Header';
import LogTable from '../LogTable';
import { TableWrapper } from './styles';

const LogPage = () => {
  useInjectPageTitle('Log');
  return (
    <PaperWrapper elevation={4}>
      <Header />
      <TableWrapper>
        <LogTable />
      </TableWrapper>
    </PaperWrapper>
  );
};

export default hot(LogPage);
