import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AddModal, LoginModal } from '../components';
import { Entries, Map } from '../pages';
import { URLS } from '../utils/urls';
import { Header } from './Header';

export const Wrapper = () => (
  <div className="container max-w-none">
    <div className="container max-w-none bg-neutral">
      <div className="container">
        <Header />
      </div>
    </div>
    <LoginModal />
    <AddModal />
    <Switch>
      <Route exact path={URLS.MAP}>
        <Map />
      </Route>
      <Route exact path={URLS.ENTRIES}>
        <Entries />
      </Route>
      <Route path="*">
        <p>Page not found</p>
      </Route>
    </Switch>
  </div>
);
