import { FormStatusBase } from '@/presentation/components';
import React from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../atom/atoms';

const LoginFormStatus: React.FC = () => {
  const [state] = useRecoilState(loginState);
  return <FormStatusBase state={state} />;
};

export default LoginFormStatus;
