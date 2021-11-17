import React from 'react';
import { makeRemoteAddAccount } from '../useCases';
import { makeSignupValidation } from '../validation';
import { Signup } from '@/presentation/pages';

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
    />
  );
};
