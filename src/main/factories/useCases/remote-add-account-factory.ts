import { makeAxiosHttpClient } from '../http';
import { makeApiUrl } from '../http/api-url-factory';
import { RemoteAddAccount } from '@/data/usecases';
import { AddAccount } from '@/domain/usecases';

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient());
};
