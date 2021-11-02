import { LoadSurveyList } from '@/domain/usecases';
import { Calendar, Icon } from '@/presentation/components';
import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './item-styles.scss';

type Props = {
  survey: LoadSurveyList.Model;
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? 'thumbUp' : 'thumbDown';
  return (
    <li data-testid="list-item" className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.iconWrap} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        <Link data-testid="link" to={`/surveys/${survey.id}`}>
          See Result
        </Link>
      </footer>
    </li>
  );
};

export default SurveyItem;
