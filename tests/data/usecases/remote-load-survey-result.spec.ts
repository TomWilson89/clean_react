import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import faker from 'faker';
import { HttpGetClientSpy } from '../mocks';

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy,
  };
};
describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.load();

    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Should throw AccessDeniedError if HttpPostClient returns 403', async () => {
    const { httpGetClientSpy, sut } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { httpGetClientSpy, sut } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
