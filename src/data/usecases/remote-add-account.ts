import { HttpClient, HttpStatusCode } from '../protocols/http';
import { EmailInUserError, UnexpectedError } from '@/domain/errors';
import { AddAccount } from '@/domain/usecases';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddAccount.Model>
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      body: params,
      method: 'POST',
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return httpResponse.body;
      }

      case HttpStatusCode.forbidden: {
        throw new EmailInUserError();
      }
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddAccount {
  export type Params = AddAccount.Params;
  export type Model = AddAccount.Model;
}
