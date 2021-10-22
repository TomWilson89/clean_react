import axios, { AxiosStatic } from 'axios';
import faker from 'faker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockedHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
});

export const mockAxios = (): jest.Mocked<AxiosStatic> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue(mockedHttpResponse());

  return mockedAxios;
};
