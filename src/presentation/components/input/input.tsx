/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Context } from '..';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { name } = props;
  const { state, setState } = useContext(Context);

  const error = state[`${name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line no-param-reassign
    event.target.readOnly = false;
  };

  const getStatus = (errorText: string): string | null => {
    let text = '🟢';
    if (errorText) text = '🔴';
    return text;
  };

  const getTitle = (errorText: string): string => {
    let text = '';
    if (errorText) text = errorText;
    return text;
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
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
