import { SaveAccessToken } from '@/domain/usecases';
import { SetStorage } from '../protocols/cache';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken);
    return new Promise((resolve) => resolve());
  }
}
