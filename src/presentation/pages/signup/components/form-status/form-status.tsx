import { FormStatusBase } from '@/presentation/components';
import React from 'react';
import { useRecoilState } from 'recoil';
import { signupState } from '../atom/atoms';

const SignupFormStatus: React.FC = () => {
  const [state] = useRecoilState(signupState);
  return <FormStatusBase state={state} />;
};

export default SignupFormStatus;
