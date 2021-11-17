import { RemoteAddAccount } from '@/data/usecases';
import { AddAccount } from '@/domain/usecases';
import { makeAxiosHttpClient } from '../http';
import { makeApiUrl } from '../http/api-url-factory';

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient());
};
