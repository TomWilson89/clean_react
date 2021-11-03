import { SubmitButtonBase } from '@/presentation/components';
import React from 'react';
import { useRecoilState } from 'recoil';
import { signupState } from '../atom/atoms';

type Props = {
  text: string;
};

const SignupSubmitButton: React.FC<Props> = ({ text }: Props) => {
  const [state] = useRecoilState(signupState);
  return <SubmitButtonBase text={text} state={state} />;
};

export default SignupSubmitButton;
