import { AxiosHttpClient } from '@/infra/http/axios-http-client';
import { AxiosStatic } from 'axios';
import { mockHttpRequest } from '../../data/mocks';
import { mockAxios, mockedHttpResponse } from '../mocks';

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
    const request = mockHttpRequest();
    await sut.request(request);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
    });
  });

  test('Should return correct response on axios', async () => {
    const { mockedAxios, sut } = makeSut();
    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('Should return the correct error on axios', () => {
    const { mockedAxios, sut } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockedHttpResponse(),
    });
    const promise = sut.request(mockHttpRequest());
    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });
});
