import { Signup } from '@/presentation/pages';
import React from 'react';
import { makeRemoteAddAccount } from '../useCases';
import { makeLocalSaveAccesstoken } from '../useCases/local-save-access-token-factory';
import { makeSignupValidation } from '../validation';

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      saveAccessToken={makeLocalSaveAccesstoken()}
    />
  );
};
