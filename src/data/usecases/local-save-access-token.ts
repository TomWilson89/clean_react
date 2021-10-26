import { UnexpectedError } from '@/domain/errors';
import { SaveAccessToken } from '@/domain/usecases';
import { SetStorage } from '../protocols/cache';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    if (!accessToken) throw new UnexpectedError();
    await this.setStorage.set('accessToken', accessToken);
    return new Promise((resolve) => resolve());
  }
}
