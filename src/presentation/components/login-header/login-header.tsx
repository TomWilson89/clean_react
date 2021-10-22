import React from 'react';
import { Logo } from '..';
import Styles from './login-header-styles.scss';

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>Developer Polls</h1>
    </header>
  );
};

export default React.memo(LoginHeader);
