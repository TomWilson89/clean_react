import { Authentication } from '@/domain/usecases';
import { mockAuthenticationModel } from '../../domain/mocks';

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();

  params: Authentication.Params;

  callsCount = 0;

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
