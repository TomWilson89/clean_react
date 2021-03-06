/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { SaveSurveyResult } from '@/domain/usecases';
import { RemoteSurveyResultModel } from '../models';
import { HttpClient, HttpStatusCode } from '../protocols/http';

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'PUT',
      body: params,
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

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
