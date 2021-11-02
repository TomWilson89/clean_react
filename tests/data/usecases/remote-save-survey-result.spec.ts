import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteSaveSurveyResult } from '@/data/usecases';
import faker from 'faker';
import { mockRemoteSurveyResultModel } from '../../domain/mocks';
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
    await sut.save({
      answer: faker.random.word(),
    });

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('PUT');
  });
});
