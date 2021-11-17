import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  makeLogin,
  makeSignup,
  makeSurveyList,
  makeSurveyResult,
} from '../factories/pages';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';
import { currentAccountState, PrivateRoute } from '@/presentation/components';

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter,
  };
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignup} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;
