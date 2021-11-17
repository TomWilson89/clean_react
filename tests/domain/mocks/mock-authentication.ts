import faker from 'faker';
import { mockAccountModel } from './mock-account';
import { Authentication } from '@/domain/usecases/';

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationModel = (): Authentication.Model =>
  mockAccountModel();
