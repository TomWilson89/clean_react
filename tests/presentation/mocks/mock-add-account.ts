import { AccountModel } from '@/domain/models';
import {
  AddAccount,
  AddAccountParams,
  AuthenticationParams,
} from '@/domain/usecases';
import { mockAccountModel } from '../../domain/mocks';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();

  params: AuthenticationParams;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}
