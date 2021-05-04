import React from 'react';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { theme } from './config';
import { ProgressFallback } from './components';

const Home = React.lazy(() => import('./views/home'));

export const App: React.FC = observer(() => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={theme(prefersDarkMode)}>
      <CssBaseline />
      <React.Suspense fallback={<ProgressFallback />}>
        <Switch>
          <Route component={Home} />
        </Switch>
      </React.Suspense>
    </ThemeProvider>
  );
});
