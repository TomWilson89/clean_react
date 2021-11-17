import React from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../atom/atoms';
import { InputBase } from '@/presentation/components';

type Props = {
  type: string;
  name: string;
  placeholder: string;
};

const LoginInput: React.FC<Props> = ({ name, placeholder, type }: Props) => {
  const [state, setState] = useRecoilState(loginState);
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

export default LoginInput;
