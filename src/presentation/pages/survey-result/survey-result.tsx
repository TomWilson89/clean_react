import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import {
  Footer,
  Header,
  Loading,
  SurveyError,
} from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import React, { useEffect, useState } from 'react';
import { SurveyResultContext, SurveyResultData } from './components';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult,
}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false,
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
  }, [state.reload]);

  const reload = (): void => {
    setState((oldState) => ({
      error: '',
      surveyResult: null,
      reload: !oldState.reload,
      isLoading: false,
    }));
  };

  const onAnswer = (answer: string): void => {
    setState((oldState) => ({ ...oldState, isLoading: true }));

    saveSurveyResult.save({ answer }).then().catch();
  };

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
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
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  );
};

export default SurveyResult;
