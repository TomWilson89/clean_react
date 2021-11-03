import { AccountModel } from '@/domain/models';
import { Authentication } from '@/domain/usecases';
import { currentAccountState } from '@/presentation/components';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { mockAccountModel } from '../../domain/mocks';

type Result = {
  setCurrentAccountMock: (account: Authentication.Model) => void;
};

type Params = {
  Page: React.FC;
  history: MemoryHistory;
  account?: AccountModel;
};

export const renderWithHistory = ({
  Page,
  history,
  account = mockAccountModel(),
}: Params): Result => {
  const setCurrentAccountMock = jest.fn();

  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account,
  };

  render(
    <RecoilRoot
      initializeState={({ set }) => set(currentAccountState, mockedState)}
    >
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  );

  return {
    setCurrentAccountMock,
  };
};
