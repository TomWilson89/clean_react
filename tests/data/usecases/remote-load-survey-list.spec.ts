import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteLoadSurveyList } from '@/data/usecases';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import faker from 'faker';
import { mockRemoteSurveyListModel } from '../../domain/mocks';
import { HttpClientSpy } from '../mocks';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('GET');
  });

  test('Should throw AccessDeniedError if HttpPostClient returns 403', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexcpectedError if HttpPostClient returns 404', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexcpectedError if HttpPostClient returns 500', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should a list of RemoteLoadSurveyList.Model if HttpClient return 200', async () => {
    const { httpClientSpy, sut } = makeSut();
    const httpResult = mockRemoteSurveyListModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const survey = await sut.loadAll();
    expect(survey).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        date: new Date(httpResult[0].date),
        didAnswer: httpResult[0].didAnswer,
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        date: new Date(httpResult[1].date),
        didAnswer: httpResult[1].didAnswer,
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        date: new Date(httpResult[2].date),
        didAnswer: httpResult[2].didAnswer,
      },
    ]);
  });

  test('Should an empty list if HttpClient return 204', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const survey = await sut.loadAll();
    expect(survey).toEqual([]);
  });
});
