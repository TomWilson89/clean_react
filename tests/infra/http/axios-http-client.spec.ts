import { HttpPostParams } from '@/data/protocols/http';
import { AxiosHttpClient } from '@/infra/http/axios-http-client';
import axios, { AxiosStatic } from 'axios';
import faker from 'faker';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<AxiosStatic>;
};

const makesut = (): SutTypes => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const sut = new AxiosHttpClient();

  return {
    sut,
    mockedAxios,
  };
};

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
};

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const { mockedAxios, sut } = makesut();
    mockedAxios.post.mockResolvedValue(mockedAxiosResult);
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct status code and body', async () => {
    const { mockedAxios, sut } = makesut();
    mockedAxios.post.mockResolvedValue(mockedAxiosResult);
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
