import faker from 'faker';
import { mockAddAccountModel, mockAddAccountParams } from '../../domain/mocks';
import { HttpClientSpy } from '../mocks';
import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteAddAccount } from '@/data/usecases';
import { EmailInUserError, UnexpectedError } from '@/domain/errors';
import { AddAccount } from '@/domain/usecases';

type SutTypes = {
  sut: RemoteAddAccount;
  httpClientSpy: HttpClientSpy<AddAccount.Model>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<AddAccount.Model>();

  const sut = new RemoteAddAccount(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();

    const addAccountParams = mockAddAccountParams();
    const { httpClientSpy, sut } = makeSut(url);
    await sut.add(addAccountParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('POST');
    expect(httpClientSpy.body).toEqual(addAccountParams);
  });

  test('Should throw EmailInUserError if HttpClient returns 403', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUserError());
  });

  test('Should throw UnexcpectedError if HttpClient returns 400', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexcpectedError if HttpClient returns 404', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexcpectedError if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AddAccount.Model ig HttpClient return 200', async () => {
    const { httpClientSpy, sut } = makeSut();
    const httpResult = mockAddAccountModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.add(mockAddAccountParams());
    expect(account).toEqual(httpResult);
  });
});
