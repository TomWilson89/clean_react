import { RemoteAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import { makeAxiosHttpClient } from '../http';
import { makeApiUrl } from '../http/api-url-factory';

export const makeRemoteAuthenticacion = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
};
