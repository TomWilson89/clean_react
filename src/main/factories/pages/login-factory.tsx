import { Login } from '@/presentation/pages';
import React from 'react';
import { makeRemoteAuthenticacion } from '../useCases/remote-authentication-factory';
import { makeLoginValidation } from '../validation/login-validation-factory';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authenticacion={makeRemoteAuthenticacion()}
      validation={makeLoginValidation()}
    />
  );
};
