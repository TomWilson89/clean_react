import { LocalStorageAdapter } from '@/infra/cache';
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter';
import { mockAccountModel } from '../../domain/mocks';

jest.mock('@/infra/cache');

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter wth correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });
});
