import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/components/context/form/form-context';
import { Validation } from '@/presentation/protocols/validations';
import React, { useEffect, useState } from 'react';
import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    emailError: '',
    passwordError: '',
    mainError: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      emailError: validation.validate('email', state.email),
    }));
  }, [state.email, validation]);

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      passwordError: validation.validate('password', state.password),
    }));
  }, [state.password, validation]);

  useEffect(() => {
    validation.validate('email', state.email);
  }, [state.email, validation]);

  useEffect(() => {
    validation.validate('password', state.password);
  }, [state.password, validation]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Type your email" />
          <Input
            type="password"
            name="password"
            placeholder="Type your password"
          />

          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Login
          </button>
          <span className={Styles.link}>Don&apos;t have an account?</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
