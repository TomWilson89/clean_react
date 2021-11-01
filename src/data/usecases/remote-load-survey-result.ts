import { HttpGetClient } from '../protocols/http';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly http: HttpGetClient
  ) {}

  async load(): Promise<void> {
    await this.http.get({ url: this.url });
    return Promise.resolve();
  }
}
