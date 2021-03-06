import React from 'react';
import { useRecoilValue } from 'recoil';
import { SubmitButtonBase } from '@/presentation/components';
import { signupState } from '../atom/atoms';

type Props = {
  text: string;
};

const SignupSubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(signupState);
  return <SubmitButtonBase text={text} state={state} />;
};

export default SignupSubmitButton;
