import React from 'react';
import { useRecoilValue } from 'recoil';
import { SubmitButtonBase } from '@/presentation/components';
import { loginState } from '../atom/atoms';

type Props = {
  text: string;
};

const LoginSubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(loginState);
  return <SubmitButtonBase text={text} state={state} />;
};

export default LoginSubmitButton;
