import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import StationPage from './components/StationPage';

const Routes = () => (
  <Switch>
    <Route path="/stations/search" children={<SearchPage />} />
    <Route path="/stations/:id" children={<StationPage />} />
    <Route path="/" children={<HomePage />} />
  </Switch>
);

export default Routes;
