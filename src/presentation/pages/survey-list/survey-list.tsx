import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header, SurveyError } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import React, { useEffect } from 'react';
import { SurveyListItem } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = React.useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });

  const handeError = useErrorHandler((error: Error) => {
    setState((oldState) => ({ ...oldState, error: error.message }));
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setState((oldState) => ({ ...oldState, surveys }));
      })
      .catch(handeError);
  }, [state.reload]);

  const reload = (): void => {
    setState((oldState) => ({
      error: '',
      surveys: [],
      reload: !oldState.reload,
    }));
  };

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        {state.error ? (
          <SurveyError reload={reload} error={state.error} />
        ) : (
          <SurveyListItem surveys={state.surveys} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
