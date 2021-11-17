import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil';
import { currentAccountState } from '@/presentation/components';
import { Authentication } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '../../domain/mocks';

type Result = {
  setCurrentAccountMock: (account: Authentication.Model) => void;
};

type Params = {
  Page: React.FC;
  history: MemoryHistory;
  account?: AccountModel;
  states?: { atom: RecoilState<any>; value: any }[];
};

export const renderWithHistory = ({
  Page,
  history,
  account = mockAccountModel(),
  states = [],
}: Params): Result => {
  const setCurrentAccountMock = jest.fn();

  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account,
  };

  const initializeState = (snapshot: MutableSnapshot): void => {
    [...states, { atom: currentAccountState, value: mockedState }].forEach(
      ({ atom, value }) => {
        snapshot.set(atom, value);
      }
    );
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  );

  return {
    setCurrentAccountMock,
  };
};
