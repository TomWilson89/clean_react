import '@/presentation/styles/global.scss';
import React from 'react';
import ReactDom from 'react-dom';
import Router from '@/main/routes/router';

ReactDom.render(<Router />, document.getElementById('main'));
