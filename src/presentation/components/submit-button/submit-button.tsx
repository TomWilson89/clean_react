import React, { useContext } from 'react';
import { Context } from '..';

type Props = {
  text: string;
};

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context);
  return (
    <button
      data-testid="submit"
      disabled={state.isFormInvalid || state.isLoading}
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
