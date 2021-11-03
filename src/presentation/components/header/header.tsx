/* eslint-disable jsx-a11y/anchor-is-valid */
import { useLogout } from '@/presentation/hooks';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Logo } from '..';
import { currentAccountState } from '../atom/atoms';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const logout = useLogout();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    logout();
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
