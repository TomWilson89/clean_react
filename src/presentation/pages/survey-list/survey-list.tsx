/* eslint-disable jsx-a11y/anchor-is-valid */
import { Footer, Logo } from '@/presentation/components';
import React from 'react';
import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => {
  const mockLi = (key: string): JSX.Element => {
    return (
      <li key={key}>
        <div className={Styles.surveyContent}>
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
      list.push(mockLi(`${i}`));
    }

    return list;
  };

  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>Tomas</span>
            <a href="#">Logout</a>
          </div>
        </div>
      </header>
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul>{mockLiList(7)}</ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
