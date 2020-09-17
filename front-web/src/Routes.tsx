import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Charts from './pages/Charts';
import Home from './pages/Home';
import Records from './pages/Records';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/records" component={Records} />
      <Route path="/charts" component={Charts} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
