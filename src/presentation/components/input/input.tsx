/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useRef } from 'react';
import { Context } from '..';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { name, placeholder } = props;
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>();

  const error = state[`${name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line no-param-reassign
    event.target.readOnly = false;
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void =>
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

  return (
    <div className={Styles.inputWrap}>
      <input
        ref={inputRef}
        {...props}
        placeholder=" "
        data-testid={name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label onClick={() => inputRef.current.focus()}>{placeholder}</label>
      <span
        data-testid={`${name}-status`}
        title={error || ''}
        className={Styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  );
};

export default Input;
