import { UnexpectedError } from '@/domain/errors';
import { LocalStorageAdapter } from '@/infra/cache';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter';
import { mockAccountModel } from '../../domain/mocks';

jest.mock('@/infra/cache');

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter.set wth correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined);
    }).toThrowError(new UnexpectedError());
  });

  test('should call LocalStorageAdapter.get wth correct values', () => {
    const account = mockAccountModel();
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account);

    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(result).toEqual(account);
  });
});
