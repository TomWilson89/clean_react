import { Authentication } from '@/domain/usecases';
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
  authenticacion: Authentication;
};

const Login: React.FC<Props> = ({ validation, authenticacion }: Props) => {
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    if (state.isLoading) {
      return;
    }
    event.preventDefault();
    setState({ ...state, isLoading: true });
    await authenticacion.auth({ email: state.email, password: state.password });
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Type your email" />
          <Input
            type="password"
            name="password"
            placeholder="Type your password"
          />

          <button
            data-testid="submit"
            disabled={
              !!state.emailError || !!state.passwordError || state.isLoading
            }
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
