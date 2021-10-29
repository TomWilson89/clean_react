import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteLoadSurveyList } from '@/data/usecases';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import faker from 'faker';
import { mockRemoteSurveyListModel } from '../../domain/mocks';
import { HttpGetClientSpy } from '../mocks';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Should throw AccessDeniedError if HttpPostClient returns 403', async () => {
    const { httpGetClientSpy, sut } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexcpectedError if HttpPostClient returns 404', async () => {
    const { httpGetClientSpy, sut } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexcpectedError if HttpPostClient returns 500', async () => {
    const { httpGetClientSpy, sut } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should a list of RemoteLoadSurveyList.Model if HttpGetClient return 200', async () => {
    const { httpGetClientSpy, sut } = makeSut();
    const httpResult = mockRemoteSurveyListModel();

    httpGetClientSpy.response = {
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

  test('Should an empty list if HttpGetClient return 204', async () => {
    const { httpGetClientSpy, sut } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const survey = await sut.loadAll();
    expect(survey).toEqual([]);
  });
});
