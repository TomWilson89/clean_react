import { makeAxiosHttpClient } from '../http';
import { makeApiUrl } from '../http/api-url-factory';
import { RemoteAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';

export const makeRemoteAuthenticacion = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient());
};
