import { LoadSurveyList } from '@/domain/usecases';
import {
  SurveyEmptyItem,
  SurveyItem,
} from '@/presentation/pages/survey-list/components';
import React from 'react';
import Styles from './styles-module.scss';

type Props = {
  surveys: LoadSurveyList.Model[];
};

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey: LoadSurveyList.Model) => (
          <SurveyItem survey={survey} key={survey.id} />
        ))
      ) : (
        <SurveyEmptyItem />
      )}
    </ul>
  );
};

export default List;
