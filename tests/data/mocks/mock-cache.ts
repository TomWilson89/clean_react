import { SetStorage } from '@/data/protocols/cache';

export class SetStorageMock implements SetStorage {
  public key: string;

  public value: unknown;

  set(key: string, value: unknown): void {
    this.key = key;
    this.value = value;
  }
}
