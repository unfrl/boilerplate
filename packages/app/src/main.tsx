import React from 'react';
import ReactDOM from 'react-dom';
import * as history from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router, withRouter } from 'react-router';

import { App } from './app';
import { routerStore } from './stores';

const browserHistory = history.createBrowserHistory();
const historyWithStore = syncHistoryWithStore(browserHistory, routerStore);
const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Router history={historyWithStore}>
    <AppWithRouter />
  </Router>,
  document.getElementById('root')
);
