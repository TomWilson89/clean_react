import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { HttpStatusCode } from '../protocols/http/http-response';

class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: {
        throw new InvalidCredentialsError();
      }

      default:
        return Promise.resolve();
    }
  }
}

export default RemoteAuthentication;
