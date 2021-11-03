import { InputBase } from '@/presentation/components';
import React from 'react';
import { useRecoilState } from 'recoil';
import { signupState } from '../atom/atoms';

type Props = {
  type: string;
  name: string;
  placeholder: string;
};

const SignupInput: React.FC<Props> = ({ name, placeholder, type }: Props) => {
  const [state, setState] = useRecoilState(signupState);
  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  );
};

export default SignupInput;
