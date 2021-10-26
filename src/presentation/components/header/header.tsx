/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Logo } from '..';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Tomas</span>
          <a href="#">Logout</a>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
