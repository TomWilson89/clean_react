import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import React, { useEffect } from 'react';
import { SurveyEmptyItem } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    // eslint-disable-next-line func-names
    (async function () {
      await loadSurveyList.loadAll();
    })();
  }, [loadSurveyList]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul data-testid="survey-list">
          <SurveyEmptyItem />
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
