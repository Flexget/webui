import React, { Suspense, FC, lazy } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import PrivateRoute from 'core/routes/PrivateRoute';
import Layout from 'core/layout/Layout';
import AppRoutes from 'core/routes/Routes';
import registerHistory from 'plugins/history';
import registerLog from 'plugins/log';
import registerTasks from 'plugins/tasks';
import registerSeries from 'plugins/series';
import registerConfig from 'plugins/config';
import registerPendingList from 'plugins/lists/pending';
import registerMovieList from 'plugins/lists/movies';
import registerEntryList from 'plugins/lists/entry';
import registerOperations from 'core/operations';
import { AuthContainer } from 'core/auth/hooks';
import { TaskContainer } from 'plugins/tasks/hooks';
import { StatusContainer } from 'core/status/hooks';
import { PluginContainer } from 'core/plugins/hooks';
import ThemeProvider from 'core/theme/ThemeProvider';
import { uriParser } from 'utils';
import LoadingSpinner from 'common/LoadingSpinner';

registerOperations();
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

const Home = lazy(() => import('core/home'));
const Login = lazy(() => import('core/auth/Login'));
const basename = uriParser(document.baseURI).pathname;

const Root: FC = () => (
  <ThemeProvider>
    <Global styles={globals} />
    <CssBaseline />
    <StatusContainer.Provider>
      <AuthContainer.Provider>
        <BrowserRouter basename={basename}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="*"
                element={
                  <PluginContainer.Provider>
                    <TaskContainer.Provider>
                      <Layout>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Routes>
                            <Route path="/" element={<PrivateRoute element={<Home />} />} />
                            <Route path="*" element={<AppRoutes />} />
                          </Routes>
                        </Suspense>
                      </Layout>
                    </TaskContainer.Provider>
                  </PluginContainer.Provider>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContainer.Provider>
    </StatusContainer.Provider>
  </ThemeProvider>
);

export default Root;
