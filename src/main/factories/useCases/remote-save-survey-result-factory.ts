import { RemoteSaveSurveyResult } from '@/data/usecases';
import { SaveSurveyResult } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators';
import { makeApiUrl } from '../http/api-url-factory';

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator()
  );
};
