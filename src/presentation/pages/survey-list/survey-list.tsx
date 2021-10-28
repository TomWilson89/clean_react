import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import React, { useEffect } from 'react';
import { SurveyEmptyItem, SurveyItem } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = React.useState({
    surveys: [] as SurveyModel[],
  });

  useEffect(() => {
    // eslint-disable-next-line func-names
    loadSurveyList.loadAll().then((surveys) => {
      setState({ surveys });
    });
  }, [loadSurveyList]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul data-testid="survey-list">
          {state.surveys.length ? (
            state.surveys.map((survey) => (
              <SurveyItem survey={survey} key={survey.id} />
            ))
          ) : (
            <SurveyEmptyItem />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
