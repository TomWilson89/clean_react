import { AxiosHttpClient } from '@/infra/http/axios-http-client';
import { AxiosStatic } from 'axios';
import { mockGetRequest, mockPostRequest } from '../../data/mocks';
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
  describe('POST', () => {
    test('Should call axios.post with correct values', async () => {
      const { mockedAxios, sut } = makeSut();
      const request = mockPostRequest();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Should return correct response on axios.post', async () => {
      const { mockedAxios, sut } = makeSut();
      const httpResponse = await sut.post(mockPostRequest());
      const axiosResponse = await mockedAxios.post.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    test('Should return the correct error on axios.post', () => {
      const { mockedAxios, sut } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockedHttpResponse(),
      });
      const promise = sut.post(mockPostRequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });

  describe('GET', () => {
    test('should call axios.get with correct values', async () => {
      const { mockedAxios, sut } = makeSut();
      const request = mockGetRequest();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
    });

    test('Should return correct response on axios.post', async () => {
      const { mockedAxios, sut } = makeSut();
      const httpResponse = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    test('Should return the correct error on axios.get', () => {
      const { mockedAxios, sut } = makeSut();
      mockedAxios.get.mockRejectedValueOnce({
        response: mockedHttpResponse(),
      });
      const promise = sut.get(mockGetRequest());
      expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});
