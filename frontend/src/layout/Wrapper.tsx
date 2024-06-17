import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {Map} from '../pages';
import {URLS} from '../utils/urls';
import {Header} from './Header';
import {LoginModal} from "../components/LogInModal";

export const Wrapper = () => (
  <div className="container max-w-none">
    <div className="container max-w-none bg-neutral">
      <div className="container">
        <Header/>
      </div>
    </div>
    <LoginModal/>
    <Switch>
      <Route exact path={URLS.MAP}>
        <Map/>
      </Route>
      <Route path="*">
        <p>Page not found</p>
      </Route>
    </Switch>
  </div>
);
