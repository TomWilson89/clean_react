import { HttpGetClient } from '../protocols/http';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll(): Promise<void> {
    await this.httpGetClient.get({ url: this.url });
    return Promise.resolve();
  }
}