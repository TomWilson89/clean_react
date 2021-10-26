import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { UpdateCurrentAccount } from '@/domain/usecases';
import { SetStorage } from '../protocols/cache';

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}

  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken) throw new UnexpectedError();
    await this.setStorage.set('account', JSON.stringify(account));
    return new Promise((resolve) => resolve());
  }
}
