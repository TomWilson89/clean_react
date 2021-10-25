import { Login } from '@/presentation/pages';
import React from 'react';
import {
  makeLocalSaveAccesstoken,
  makeRemoteAuthenticacion,
} from '../useCases';
import { makeLoginValidation } from '../validation';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authenticacion={makeRemoteAuthenticacion()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccesstoken()}
    />
  );
};
