import { Calendar, Footer, Header, Loading } from '@/presentation/components';
import React from 'react';
import FlipMove from 'react-flip-move';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        {false && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                culpa doloribus, dolor quas sint adipisci tempore iusto?
              </h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              <li className={Styles.active}>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-react.png"
                  alt="ReactJs"
                />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-vue.png"
                  alt="Vue"
                />
                <span className={Styles.answer}>Vue</span>
                <span className={Styles.percent}>30%</span>
              </li>
              <li>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-angular.png"
                  alt="Angular"
                />
                <span className={Styles.answer}>Angular</span>
                <span className={Styles.percent}>20%</span>
              </li>
            </FlipMove>
            <button type="button">Go back</button>
            {false && <Loading />}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
