import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory';
import { makeAxiosHttpClient } from '../http';
import { HttpClient } from '@/data/protocols/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  );
};
