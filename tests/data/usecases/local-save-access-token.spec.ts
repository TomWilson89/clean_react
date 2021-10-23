/* eslint-disable max-classes-per-file */
import { LocalSaveAccessToken } from '@/data/usecases';
import faker from 'faker';
import { SetStorageSpy } from '../mocks';

describe('LocalSaveAccessToken', () => {
  test('should call set method with correct value to save accessToken', async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorageSpy);
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
