import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'root';
import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import 'normalize.css';

fontawesome.library.add(regular, solid);

ReactDOM.render(<Root />, document.getElementById('react'));

if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root').default; // eslint-disable-line global-require
    ReactDOM.render(<NewRoot />, document.getElementById('react'));
  });
}
