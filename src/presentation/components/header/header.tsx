/* eslint-disable jsx-a11y/anchor-is-valid */
import { ApiContext } from '@/presentation/contexts';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Logo } from '..';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);
  const history = useHistory();

  const logout = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logout}>
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
