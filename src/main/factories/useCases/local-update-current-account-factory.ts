import { LocalUpdateCurrentAccount } from '@/data/usecases';
import { UpdateCurrentAccount } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory';

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter());
};
