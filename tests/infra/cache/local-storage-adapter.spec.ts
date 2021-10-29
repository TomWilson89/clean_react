import { LocalStorageAdapter } from '@/infra/cache';
import faker from 'faker';
import 'jest-localstorage-mock';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should call localStorage.setItem with crorect values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<Record<string, never>>();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test('should call localStorage.removeItem if value is null', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('should call localStorage.getItem with corect values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<Record<string, never>>();
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));

    const obj = sut.get(key);
    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
