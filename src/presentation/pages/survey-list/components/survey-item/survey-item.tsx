import { Icon } from '@/presentation/components';
import React from 'react';
import Styles from './survey-item-styles.scss';

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName="thumbDown" className={Styles.iconWrap} />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2020</span>
        </time>
        <p>Which framework do you like the most?</p>
      </div>
      <footer>See Result</footer>
    </li>
  );
};

export default SurveyItem;
