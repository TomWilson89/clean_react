import faker from 'faker';
import { AccountModel } from '@/domain/models';
import { AddAccount } from '@/domain/usecases';

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName(),
});

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    name: faker.name.findName(),
    password,
    passwordConfirmation: password,
  };
};

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel();
