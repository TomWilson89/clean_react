import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http/';
import { RemoteAuthentication } from '@/data/usecases';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/';
import {
  mockAuthenticationModel,
  mockAuthenticationParams,
} from '../../domain/mocks';
import { HttpClientSpy } from '../mocks';

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.Model>();

  const sut = new RemoteAuthentication(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { httpClientSpy, sut } = makeSut(url);
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('POST');
    expect(httpClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexcpectedError if HttpClient returns 400', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexcpectedError if HttpClient returns 404', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexcpectedError if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an Authentication.Model if HttpClient return 200', async () => {
    const { httpClientSpy, sut } = makeSut();
    const httpResult = mockAuthenticationModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.auth(mockAuthenticationParams());
    expect(account).toEqual(httpResult);
  });
});
