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

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const { mockedAxios, sut } = makesut();
    const url = faker.internet.url();
    await sut.post({ url });
    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
