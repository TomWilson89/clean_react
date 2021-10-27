import { GetStorage, SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: Record<string, unknown>): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): Record<string, unknown> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
