import { SubmitButtonBase } from '@/presentation/components';
import React from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../atom/atoms';

type Props = {
  text: string;
};

const LoginSubmitButton: React.FC<Props> = ({ text }: Props) => {
  const [state] = useRecoilState(loginState);
  return <SubmitButtonBase text={text} state={state} />;
};

export default LoginSubmitButton;
