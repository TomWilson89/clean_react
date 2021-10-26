import { FormContext } from '@/presentation/contexts';
import React, { useContext } from 'react';

type Props = {
  text: string;
};

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext);
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
