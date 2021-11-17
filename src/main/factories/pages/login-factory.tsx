import React from 'react';
import { makeRemoteAuthenticacion } from '../useCases';
import { makeLoginValidation } from '../validation';
import { Login } from '@/presentation/pages';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticacion()}
      validation={makeLoginValidation()}
    />
  );
};
