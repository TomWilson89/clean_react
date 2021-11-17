import React from 'react';
import { SurveyList } from '@/presentation/pages';
import { makeRemoteSurveyList } from '../useCases';

export const makeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeRemoteSurveyList()} />;
};
