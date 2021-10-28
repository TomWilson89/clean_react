import React from 'react';
import Styles from './empty-item-styles.scss';

const SurveyEmptyItem: React.FC = () => {
  return (
    <>
      <li data-testid="empty-list-item" className={Styles.surveyEmtpyItem} />
      <li data-testid="empty-list-item" className={Styles.surveyEmtpyItem} />
      <li data-testid="empty-list-item" className={Styles.surveyEmtpyItem} />
      <li data-testid="empty-list-item" className={Styles.surveyEmtpyItem} />
    </>
  );
};

export default SurveyEmptyItem;
