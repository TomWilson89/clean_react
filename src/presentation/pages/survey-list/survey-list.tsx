import { Footer, Header } from '@/presentation/components';
import React from 'react';
import { SurveyEmptyItem } from './components';
import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => {
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
