import { AccountModel } from '../models';

export type AddAccountParams = {
  email: string;
  password: string;
  passworsdConfirmation: string;
  name: string;
};

export interface AddAccount {
  add(params: AddAccountParams): Promise<AccountModel>;
}
