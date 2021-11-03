import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import {
  Footer,
  Header,
  Loading,
  SurveyError,
} from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  onSurveyAnswerState,
  SurveyResultData,
  surveyResultState,
} from './components';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult,
}: Props) => {
  const resetLoginState = useResetRecoilState(surveyResultState);
  const [state, setState] = useRecoilState(surveyResultState);
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState);

  const handeError = useErrorHandler((error: Error) => {
    setState((oldState) => ({
      ...oldState,
      surveyResult: null,
      error: error.message,
      isLoading: false,
    }));
  });

  const onAnswer = (answer: string): void => {
    if (state.isLoading) return;

    setState((oldState) => ({ ...oldState, isLoading: true }));

    saveSurveyResult
      .save({ answer })
      .then((surveyResult) => {
        setState((oldState) => ({
          ...oldState,
          surveyResult,
          isLoading: false,
          error: '',
        }));
      })
      .catch(handeError);
  };

  useEffect(() => {
    setOnAnswer({ onAnswer });
    resetLoginState();
  }, []);

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
  }, [state.reload]);

  const reload = (): void => {
    setState((oldState) => ({
      error: '',
      surveyResult: null,
      reload: !oldState.reload,
      isLoading: false,
    }));
  };

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div
        data-testid="survey-result"
        role="main"
        className={Styles.contentWrap}
      >
        {state.surveyResult && (
          <SurveyResultData surveyResult={state.surveyResult} />
        )}
        {state.isLoading && <Loading />}
        {state.error && <SurveyError error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
