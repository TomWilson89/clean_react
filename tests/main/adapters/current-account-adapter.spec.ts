import { mockAccountModel } from '../../domain/mocks';
import { LocalStorageAdapter } from '@/infra/cache';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter';

jest.mock('@/infra/cache');

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter.set wth correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
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
