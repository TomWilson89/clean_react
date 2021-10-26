/* eslint-disable jsx-a11y/anchor-is-valid */
import { Footer, Header, Icon } from '@/presentation/components';
import React from 'react';
import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => {
  const mockLi = (key: string, status: boolean): JSX.Element => {
    return (
      <li key={key}>
        <div className={Styles.surveyContent}>
          <Icon
            iconName={status ? 'thumbUp' : 'thumbDown'}
            className={Styles.iconWrap}
          />
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

  const mockLiList = (number: number): JSX.Element[] => {
    const list: JSX.Element[] = [];

    for (let i = 0; i < number; i++) {
      const badge = Math.round(Math.random() * 1);
      list.push(mockLi(`${i}`, !!badge));
    }

    return list;
  };

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul>{mockLiList(9)}</ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
