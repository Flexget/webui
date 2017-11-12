import React from 'react';
import createStore from 'store';
import history from 'history';
import { JssProvider } from 'react-jss';
import { create } from 'jss';
import preset from 'jss-preset-default';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from 'material-ui/styles';
import { injectGlobal } from 'react-emotion';
import theme from 'theme';
import PrivateRoute from 'core/routes/components/PrivateRoute';
import Layout from 'core/layout';
import Routes from 'core/routes';
import { createAsyncComponent } from 'utils/loading';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    font-size: 10px;
  }

  body {
    height: 100%;
    width: 100%;
    font-size: 1.6rem;
    background-color: ${theme.palette.background.contentFrame};
    font-family: 'Roboto';
  }

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }
`;

const Home = createAsyncComponent(() => import('core/home'));
const Login = createAsyncComponent(() => import('core/auth'));

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;
jss.options.insertionPoint = 'material-ui';

const Root = () => (
  <JssProvider jss={jss}>
    <Provider store={createStore()}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <div>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Layout>
                <Switch>
                  <PrivateRoute path="/" exact component={Home} />
                  <Routes />
                </Switch>
              </Layout>
            </Switch>
          </div>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </JssProvider>
);

export default Root;
