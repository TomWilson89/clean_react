import { FormStatusBase } from '@/presentation/components';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../atom/atoms';

const LoginFormStatus: React.FC = () => {
  const state = useRecoilValue(loginState);
  return <FormStatusBase state={state} />;
};

export default LoginFormStatus;
