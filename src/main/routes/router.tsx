import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SurveyList } from '../../presentation/pages';
import { makeLogin, makeSignup } from '../factories/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignup} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
