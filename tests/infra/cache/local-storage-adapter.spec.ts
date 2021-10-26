import { LocalStorageAdapter } from '@/infra/cache';
import faker from 'faker';
import 'jest-localstorage-mock';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should call localStorage with corect values', () => {
    const sut = makeSut();
    const accessToken = faker.datatype.uuid();
    const key = faker.database.column();
    sut.set(key, accessToken);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, accessToken);
  });
});
