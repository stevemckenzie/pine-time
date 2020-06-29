import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchPage from './Station/components/SearchPage';
import StationPage from './Station/components/StationPage';

const Routes = () => (
  <Switch>
    <Route path="/stations/search" children={<SearchPage />} />
    <Route path="/stations/:id" children={<StationPage />} />
  </Switch>
);

export default Routes;
