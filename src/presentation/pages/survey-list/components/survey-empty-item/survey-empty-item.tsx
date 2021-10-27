import React from 'react';
import Styles from './survey-empty-item-styles.scss';

const SurveyEmptyItem: React.FC = () => {
  return (
    <>
      <li className={Styles.surveyEmtpyItem} />
      <li className={Styles.surveyEmtpyItem} />
      <li className={Styles.surveyEmtpyItem} />
      <li className={Styles.surveyEmtpyItem} />
    </>
  );
};

export default SurveyEmptyItem;
