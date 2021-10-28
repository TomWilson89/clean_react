import { SurveyList } from '@/presentation/pages';
import React from 'react';
import { makeRemoteSurveyList } from '../useCases';

export const makeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeRemoteSurveyList()} />;
};
