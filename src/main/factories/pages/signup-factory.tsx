import { Signup } from '@/presentation/pages';
import React from 'react';
import {
  makeLocalUpdateCurrentAccount,
  makeRemoteAddAccount,
} from '../useCases';
import { makeSignupValidation } from '../validation';

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
