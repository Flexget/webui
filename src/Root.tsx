import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import store from 'store';
import history from 'core/history';
import { StylesProvider } from '@material-ui/styles';
import { CssBaseline, Theme } from '@material-ui/core';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Global, css } from '@emotion/core';
import PrivateRoute from 'core/routes/PrivateRoute';
import Layout from 'core/layout/Layout';
import Routes from 'core/routes/Routes';
import { createAsyncComponent } from 'utils/loading';
import registerHistory from 'plugins/history';
import registerLog from 'plugins/log';
import registerSeries from 'plugins/series';
import registerPendingList from 'plugins/pendingList';
import { AuthContainer } from 'core/auth/container';
import { TaskContainer } from 'core/tasks/hooks';
import { StatusContainer } from 'core/status/hooks';
import { RouteContainer } from 'core/routes/hooks';
import ThemeProvider from 'core/theme/ThemeProvider';

registerHistory();
registerLog();
registerSeries();
registerPendingList();

const globals = (theme: Theme) => css`
  html {
    font-size: 10px;
  }

  body {
    height: 100%;
    width: 100%;
    font-size: 1.6rem;
    background-color: ${theme.palette.grey[200]};
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
const Login = createAsyncComponent(() => import('core/auth/Login'));

const Root = () => (
  <ThemeProvider>
    <Global styles={globals} />
    <CssBaseline />
    <StylesProvider injectFirst>
      <Provider store={store}>
        <StatusContainer.Provider>
          <AuthContainer.Provider>
            <ConnectedRouter history={history}>
              <Switch>
                <Route path="/login" exact component={Login} />
                <Route
                  render={() => (
                    <RouteContainer.Provider>
                      <TaskContainer.Provider>
                        <Layout>
                          <Switch>
                            <PrivateRoute path="/" exact component={Home} />
                            <Route render={() => <Routes />} />
                          </Switch>
                        </Layout>
                      </TaskContainer.Provider>
                    </RouteContainer.Provider>
                  )}
                />
              </Switch>
            </ConnectedRouter>
          </AuthContainer.Provider>
        </StatusContainer.Provider>
      </Provider>
    </StylesProvider>
  </ThemeProvider>
);

export default hot(Root);
