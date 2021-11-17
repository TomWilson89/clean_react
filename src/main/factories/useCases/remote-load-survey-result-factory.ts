import { makeAuthorizeHttpClientDecorator } from '../decorators';
import { makeApiUrl } from '../http/api-url-factory';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { LoadSurveyResult } from '@/domain/usecases';

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator()
  );
};
