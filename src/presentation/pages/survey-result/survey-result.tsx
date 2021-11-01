import { LoadSurveyResult } from '@/domain/usecases';
import {
  Calendar,
  Footer,
  Header,
  Loading,
  SurveyError,
} from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  });

  const handeError = useErrorHandler((error: Error) => {
    setState((oldState) => ({
      ...oldState,
      surveyResult: null,
      error: error.message,
    }));
  });

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => {
        setState((oldState) => ({
          ...oldState,
          surveyResult,
        }));
      })
      .catch(handeError);
  }, []);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div
        data-testid="survey-result"
        role="main"
        className={Styles.contentWrap}
      >
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={state.surveyResult.date}
                className={Styles.calendarWrap}
              />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answersList}>
              {state.surveyResult.answers.map((answer) => {
                return (
                  <li
                    data-testid="answer-wrap"
                    key={answer.answer}
                    className={
                      answer.isCurrentAccountAnswer ? Styles.active : ''
                    }
                  >
                    {answer.image && (
                      <img
                        data-testid="image"
                        src={answer.image}
                        alt={answer.answer}
                      />
                    )}
                    <span data-testid="answer" className={Styles.answer}>
                      {answer.answer}
                    </span>
                    <span data-testid="percent" className={Styles.percent}>
                      {answer.percent}%
                    </span>
                  </li>
                );
              })}
            </FlipMove>
            <button type="button">Go back</button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <SurveyError error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
