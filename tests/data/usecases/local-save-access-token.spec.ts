/* eslint-disable max-classes-per-file */
import { LocalSaveAccessToken } from '@/data/usecases';
import faker from 'faker';
import { SetStorageMock } from '../mocks';

type SutTypes = {
  setStorageMock: SetStorageMock;
  sut: LocalSaveAccessToken;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call set method with correct value to save accessToken', async () => {
    const { setStorageMock, sut } = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });
});
