import { EmailInUserError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { AddAccount, AddAccountParams } from '@/domain/usecases';
import { HttpPostClient, HttpStatusCode } from '../protocols/http';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return null;
      }

      case HttpStatusCode.forbidden: {
        throw new EmailInUserError();
      }
      default:
        throw new UnexpectedError();
    }
  }
}
