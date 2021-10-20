import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { AccountModel } from '@/domain/models/account-model';
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/authentication';

class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    await this.httpPostClient.post({ url: this.url, body: params });
    return { accessToken: '' };
  }
}

export default RemoteAuthentication;
