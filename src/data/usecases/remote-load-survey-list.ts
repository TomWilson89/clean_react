import { UnexpectedError } from '@/domain/errors';
import { LoadSurveyList } from '@/domain/usecases';
import { HttpGetClient, HttpStatusCode } from '../protocols/http';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return httpResponse.body;
      }
      case HttpStatusCode.noContent: {
        return [];
      }

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model;
}
