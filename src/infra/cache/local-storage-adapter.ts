import { SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage {
  set(key: string, value: Record<string, unknown>): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
