import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { HttpGetClient, HttpStatusCode } from '../protocols/http';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async load(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return Promise.resolve();
      }

      case HttpStatusCode.forbidden: {
        throw new AccessDeniedError();
      }

      default:
        throw new UnexpectedError();
    }
  }
}
