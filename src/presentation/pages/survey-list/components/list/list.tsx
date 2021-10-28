import { SurveyModel } from '@/domain/models';
import {
  SurveyContext,
  SurveyEmptyItem,
  SurveyItem,
} from '@/presentation/pages/survey-list/components';
import React, { useContext } from 'react';
import Styles from './styles-module.scss';

const List: React.FC = () => {
  const { state } = useContext(SurveyContext);

  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((survey: SurveyModel) => (
          <SurveyItem survey={survey} key={survey.id} />
        ))
      ) : (
        <SurveyEmptyItem />
      )}
    </ul>
  );
};

export default List;
