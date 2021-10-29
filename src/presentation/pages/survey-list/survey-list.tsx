import { AccessDeniedError } from '@/domain/errors';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SurveyContext, SurveyErrpr, SurveyListItem } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const hisotry = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);

  const [state, setState] = React.useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setState({ ...state, surveys });
      })
      .catch((err) => {
        if (err instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          hisotry.replace('/login');
        } else {
          setState({ ...state, error: err.message });
        }
      });
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
