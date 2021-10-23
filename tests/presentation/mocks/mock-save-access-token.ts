import { SaveAccessToken } from '@/domain/usecases';

export class SaveAccessTokenMock implements SaveAccessToken {
  value: string;

  async save(value: string): Promise<void> {
    this.value = value;
  }
}
