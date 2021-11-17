import React from 'react';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthenticacion } from '../useCases';
import { makeLoginValidation } from '../validation';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticacion()}
      validation={makeLoginValidation()}
    />
  );
};
