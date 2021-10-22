import { RemoteAuthentication } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/http/axios-http-client';
import { Login } from '@/presentation/pages';
import { ValidationBuilder } from '@/validation/builder';
import { ValidationComposite } from '@/validation/composite';
import React from 'react';

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);
  return (
    <Login
      authenticacion={remoteAuthentication}
      validation={validationComposite}
    />
  );
};