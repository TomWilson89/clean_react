/* eslint-disable max-classes-per-file */
import { LocalSaveAccessToken } from '@/data/usecases';
import faker from 'faker';
import { SetStorageSpy } from '../mocks';

type SutTypes = {
  setStorageSpy: SetStorageSpy;
  sut: LocalSaveAccessToken;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);
  return {
    sut,
    setStorageSpy,
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call set method with correct value to save accessToken', async () => {
    const { setStorageSpy, sut } = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
