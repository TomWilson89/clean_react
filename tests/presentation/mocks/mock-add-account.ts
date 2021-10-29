import { AddAccount } from '@/domain/usecases';
import { mockAddAccountModel } from '../../domain/mocks';

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel();

  params: AddAccount.Params;

  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
