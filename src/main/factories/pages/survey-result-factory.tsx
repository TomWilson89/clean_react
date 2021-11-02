import { SurveyResult } from '@/presentation/pages';
import React from 'react';
import { useParams } from 'react-router-dom';
import { makeRemoteSurveyResult } from '../useCases';

type Params = {
  id: string;
};

export const makeSurveyResult: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams<Params>();
  return <SurveyResult loadSurveyResult={makeRemoteSurveyResult(id)} />;
};
