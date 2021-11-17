/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { onSurveyAnswerState } from '../atoms/atoms';
import Styles from './answer-styles.scss';
import { SurveyResultAnswerModel } from '@/domain/models';

type Props = {
  answer: SurveyResultAnswerModel;
};

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState);

  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : '';

  const answerClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    if (e.currentTarget.classList.contains(Styles.active)) {
      return;
    }
    onAnswer(answer.answer);
  };
  return (
    <li
      onClick={answerClick}
      data-testid="answer-wrap"
      className={[Styles.answerWrap, activeClassName].join(' ')}
    >
      {answer.image && (
        <img data-testid="image" src={answer.image} alt={answer.answer} />
      )}
      <span data-testid="answer" className={Styles.answer}>
        {answer.answer}
      </span>
      <span data-testid="percent" className={Styles.percent}>
        {answer.percent}%
      </span>
    </li>
  );
};

export default Answer;
