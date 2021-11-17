import faker from 'faker';
import { HttpRequest } from '@/data/protocols/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import {
  GetStorageSpy,
  HttpClientSpy,
  mockHttpRequest,
} from '../../data/mocks';
import { mockAccountModel } from '../../domain/mocks';

type SutType = {
  getStorageSpy: GetStorageSpy;
  sut: AuthorizeHttpClientDecorator;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (): SutType => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();

  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  return {
    getStorageSpy,
    sut,
    httpClientSpy,
  };
};

describe('AuthorizeHttpClientDecorator', () => {
  test('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.request(mockHttpRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  test('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpRequest: HttpRequest = {
      method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
      url: faker.internet.url(),
      headers: {
        field: faker.random.words(),
      },
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
    expect(httpClientSpy.method).toEqual(httpRequest.method);
  });

  test('should add headers to HttpClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  test('should merge headers to HttpClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();

    const field = faker.random.words();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
      headers: {
        field,
      },
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toEqual(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  test('should return the same resutl as HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());

    expect(httpResponse).toEqual(httpClientSpy.response);
  });
});
