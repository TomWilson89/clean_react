/* eslint-disable @typescript-eslint/no-unused-vars */
import { SaveSurveyResult } from '@/domain/usecases';
import { RemoteSurveyResultModel } from '../models';
import { HttpClient } from '../protocols/http';

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'PUT',
    });
    return null;
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
