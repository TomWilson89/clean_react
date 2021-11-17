import React from 'react';
import { useRecoilValue } from 'recoil';
import { FormStatusBase } from '@/presentation/components';
import { signupState } from '../atom/atoms';

const SignupFormStatus: React.FC = () => {
  const state = useRecoilValue(signupState);
  return <FormStatusBase state={state} />;
};

export default SignupFormStatus;
