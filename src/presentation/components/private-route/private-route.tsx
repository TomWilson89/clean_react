/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentAccountState } from '../atom/atoms';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const MemoizedNestedComponent = React.useCallback(
    () => <Redirect to="/login" />,
    []
  );
  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={MemoizedNestedComponent} />
  );
};

export default PrivateRoute;
