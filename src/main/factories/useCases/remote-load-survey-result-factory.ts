import { RemoteLoadSurveyResult } from '@/data/usecases';
import { LoadSurveyResult } from '@/domain/usecases';
import { makeAuthorizeHttpGetClientDecorator } from '../decorators';
import { makeApiUrl } from '../http/api-url-factory';

export const makeRemoteSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpGetClientDecorator()
  );
};
