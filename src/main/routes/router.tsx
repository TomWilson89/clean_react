import { PrivateRoute } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';
import {
  makeLogin,
  makeSignup,
  makeSurveyList,
  makeSurveyResult,
} from '../factories/pages';

const Router: React.FC = () => {
  return (
    <RecoilRoot>
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
            <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
          </Switch>
        </BrowserRouter>
      </ApiContext.Provider>
    </RecoilRoot>
  );
};

export default Router;
