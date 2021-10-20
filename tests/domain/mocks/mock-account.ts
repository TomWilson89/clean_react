import { AccountModel } from '@/domain/models/account-model';
import faker from 'faker';

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
