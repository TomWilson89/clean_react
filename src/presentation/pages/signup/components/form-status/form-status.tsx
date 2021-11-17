import React from 'react';
import { useRecoilValue } from 'recoil';
import { signupState } from '../atom/atoms';
import { FormStatusBase } from '@/presentation/components';

const SignupFormStatus: React.FC = () => {
  const state = useRecoilValue(signupState);
  return <FormStatusBase state={state} />;
};

export default SignupFormStatus;
