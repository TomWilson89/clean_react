import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadSurveyResult } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../protocols/http';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const remoteSurveyResult = Object.assign(httpResponse.body, {
          date: new Date(httpResponse.body.date),
        });
        return remoteSurveyResult;
      }

      case HttpStatusCode.forbidden: {
        throw new AccessDeniedError();
      }

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    date: string;
    answers: {
      image?: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }[];
  };
}
