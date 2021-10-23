import { LocalSaveAccessToken } from '@/data/usecases';
import { SaveAccessToken } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory';

export const makeLocalSaveAccesstoken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
};
