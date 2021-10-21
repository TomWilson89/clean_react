import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { mockAccountModel } from '../../domain/mocks';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();

  params: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}
