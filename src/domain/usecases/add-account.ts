import { AccountModel } from '../models';

export type AddAcountParams = {
  email: string;
  password: string;
  passworsdConfirmation: string;
  name: string;
};

export interface AddAccount {
  add(params: AddAcountParams): Promise<AccountModel>;
}
