import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { StylesProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import PrivateRoute from 'core/routes/PrivateRoute';
import Layout from 'core/layout/Layout';
import Routes from 'core/routes/Routes';
import { createAsyncComponent } from 'utils/loading';
import registerHistory from 'plugins/history';
import registerLog from 'plugins/log';
import registerTasks from 'plugins/tasks';
import registerSeries from 'plugins/series';
import registerConfig from 'plugins/config';
import registerPendingList from 'plugins/lists/pending';
import registerMovieList from 'plugins/lists/movies';
import registerEntryList from 'plugins/lists/entry';
import { AuthContainer } from 'core/auth/hooks';
import { TaskContainer } from 'plugins/tasks/hooks';
import { StatusContainer } from 'core/status/hooks';
import { PluginContainer } from 'core/plugins/hooks';
import ThemeProvider from 'core/theme/ThemeProvider';
import { VersionContainer } from 'core/layout/SideNav/hooks';
import { uriParser } from 'utils';

registerHistory();
registerLog();
registerConfig();
registerTasks();
registerSeries();
registerPendingList();
registerEntryList();
registerMovieList();

const globals = css`
  html {
    font-size: 10px;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Roboto';
  }

  a {
    text-decoration: none;
  }

  *:focus {
    outline: none;
  }
`;

const Home = createAsyncComponent(() => import('core/home'));
const Login = createAsyncComponent(() => import('core/auth/Login'));
const basename = uriParser(document.baseURI).pathname;

const Root = () => (
  <ThemeProvider>
    <Global styles={globals} />
    <CssBaseline />
    <StylesProvider injectFirst>
      <StatusContainer.Provider>
        <AuthContainer.Provider>
          <VersionContainer.Provider>
            <BrowserRouter basename={basename}>
              <Switch>
                <Route path="/login" exact component={Login} />
                <Route
                  render={() => (
                    <PluginContainer.Provider>
                      <TaskContainer.Provider>
                        <Layout>
                          <Switch>
                            <PrivateRoute path="/" exact component={Home} />
                            <Route component={Routes} />
                          </Switch>
                        </Layout>
                      </TaskContainer.Provider>
                    </PluginContainer.Provider>
                  )}
                />
              </Switch>
            </BrowserRouter>
          </VersionContainer.Provider>
        </AuthContainer.Provider>
      </StatusContainer.Provider>
    </StylesProvider>
  </ThemeProvider>
);

export default hot(Root);
