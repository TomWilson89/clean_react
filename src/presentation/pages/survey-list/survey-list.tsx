import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import React, { useEffect } from 'react';
import { SurveyContext, SurveyErrpr, SurveyListItem } from './components';
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
    setState({ ...state, error: error.message });
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setState({ ...state, surveys });
      })
      .catch(handeError);
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <SurveyErrpr /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
