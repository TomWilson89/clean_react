import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteSaveSurveyResult } from '@/data/usecases';
import { AccessDeniedError } from '@/domain/errors';
import faker from 'faker';
import {
  mockRemoteSurveyResultModel,
  mockSaveSurveyResultParams,
} from '../../domain/mocks';
import { HttpClientSpy } from '../mocks';

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};
describe('RemoteSaveSurveyResult', () => {
  test('should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel(),
    };
    const saveSurveyResultParams = mockSaveSurveyResultParams();
    await sut.save(saveSurveyResultParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('PUT');
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams);
  });

  test('Should throw AccessDeniedError if HttpPostClient returns 403', async () => {
    const { httpClientSpy, sut } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });
});