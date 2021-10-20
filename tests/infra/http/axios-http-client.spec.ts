import { AxiosHttpClient } from '@/infra/http/axios-http-client';
import { AxiosStatic } from 'axios';
import { mockPostRequest } from '../../data/mocks';
import { mockAxios } from '../mocks';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<AxiosStatic>;
};

const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios();

  const sut = new AxiosHttpClient();

  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const { mockedAxios, sut } = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct status code and body', () => {
    const { mockedAxios, sut } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
