import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteAddAccount } from '@/data/usecases';
import { EmailInUserError, UnexpectedError } from '@/domain/errors';
import { AddAccount } from '@/domain/usecases';
import faker from 'faker';
import { mockAddAccountModel, mockAddAccountParams } from '../../domain/mocks';
import { HttpPostClientSpy } from '../mocks';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Model>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccount.Model>();

  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { httpPostClientSpy, sut } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test('Should throw EmailInUserError if HttpPostClient returns 403', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUserError());
  });

  test('Should throw UnexcpectedError if HttpPostClient returns 400', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexcpectedError if HttpPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexcpectedError if HttpPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AddAccount.Model ig HttpPostClient return 200', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const httpResult = mockAddAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.add(mockAddAccountParams());
    expect(account).toEqual(httpResult);
  });
});
