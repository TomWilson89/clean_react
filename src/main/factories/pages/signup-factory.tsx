import React from 'react';
import { Signup } from '@/presentation/pages';
import { makeRemoteAddAccount } from '../useCases';
import { makeSignupValidation } from '../validation';

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
    />
  );
};
