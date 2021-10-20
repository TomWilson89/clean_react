import axios, { AxiosStatic } from 'axios';
import faker from 'faker';

export const mockAxios = (): jest.Mocked<AxiosStatic> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.datatype.number(),
  };
  mockedAxios.post.mockResolvedValue(mockedAxiosResult);

  return mockedAxios;
};
