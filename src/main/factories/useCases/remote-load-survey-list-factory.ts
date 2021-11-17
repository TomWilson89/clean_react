import { makeAuthorizeHttpClientDecorator } from '../decorators';
import { makeApiUrl } from '../http/api-url-factory';
import { RemoteLoadSurveyList } from '@/data/usecases';
import { LoadSurveyList } from '@/domain/usecases';

export const makeRemoteSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpClientDecorator()
  );
};
