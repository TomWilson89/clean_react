import axios, { AxiosStatic } from 'axios';
import faker from 'faker';

export const mockedHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
});

export const mockAxios = (): jest.Mocked<AxiosStatic> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue(mockedHttpResponse());
  mockedAxios.get.mockResolvedValue(mockedHttpResponse());

  return mockedAxios;
};
