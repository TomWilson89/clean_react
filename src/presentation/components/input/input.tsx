/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import Context from '../context/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { name } = props;
  const { errorState } = useContext(Context);

  const error = errorState[name];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line no-param-reassign
    event.target.readOnly = false;
  };

  const getStatus = (errorText: string): string | null => {
    let text = null;
    if (errorText) text = '🔴';
    return text;
  };

  const getTitle = (errorText: string): string => {
    return errorText;
  };

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span
        data-testid={`${name}-status`}
        title={getTitle(error)}
        className={Styles.status}
      >
        {getStatus(error)}
      </span>
    </div>
  );
};

export default Input;
