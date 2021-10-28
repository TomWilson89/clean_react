import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { GetStorageSpy, mockGetRequest } from '../../data/mocks';

type SutType = {
  getStorageSpy: GetStorageSpy;
  sut: AuthorizeHttpGetClientDecorator;
};

const makeSut = (): SutType => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);

  return {
    getStorageSpy,
    sut,
  };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call GetStorage with correct value', () => {
    const { sut, getStorageSpy } = makeSut();
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });
});
