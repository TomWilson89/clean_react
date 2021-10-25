import Router from '@/presentation/router';
import '@/presentation/styles/global.scss';
import React from 'react';
import ReactDom from 'react-dom';
import { makeLogin, makeSignup } from './factories/pages';

ReactDom.render(
  <Router makeLogin={makeLogin} makeSignUp={makeSignup} />,
  document.getElementById('main')
);
