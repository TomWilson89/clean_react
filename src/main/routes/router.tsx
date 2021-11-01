import { PrivateRoute } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import { SurveyResult } from '@/presentation/pages';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';
import { makeLogin, makeSignup, makeSurveyList } from '../factories/pages';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignup} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/survey" exact component={SurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
