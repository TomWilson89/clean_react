/* eslint-disable max-classes-per-file */
import { LocalUpdateCurrentAccount } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';
import { mockAccountModel } from '../../domain/mocks';
import { SetStorageMock } from '../mocks';

type SutTypes = {
  setStorageMock: SetStorageMock;
  sut: LocalUpdateCurrentAccount;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call set method with correct value to save accessToken', async () => {
    const { setStorageMock, sut } = makeSut();
    const account = mockAccountModel();
    await sut.save(account);
    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  test('should throw if SetStorage throws', async () => {
    const { setStorageMock, sut } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(mockAccountModel());
    await expect(promise).rejects.toThrow();
  });

  test('should throw if accessToken is false', async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
