import React from 'react';
import { makeRemoteSurveyList } from '../useCases';
import { SurveyList } from '@/presentation/pages';

export const makeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeRemoteSurveyList()} />;
};
