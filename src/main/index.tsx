import Router from '@/presentation/router';
import '@/presentation/styles/global.scss';
import React from 'react';
import ReactDom from 'react-dom';
import { makeLogin } from './factories/pages';

ReactDom.render(
  <Router makeLogin={makeLogin} />,
  document.getElementById('main')
);
