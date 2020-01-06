import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import Editor from './Editor';

const Config = () => {
  useInjectPageTitle('Config Editor');

  return <Editor />;
};

export default hot(Config);
