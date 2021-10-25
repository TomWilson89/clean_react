import {
  Context,
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validations';
import React, { useEffect, useState } from 'react';
import Styles from './signup-styles.scss';

type Props = {
  validation: Validation;
};

const Signup: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    nameError: '',
    emailError: '',
    passwordConfirmationError: '',
    passwordError: '',
    mainError: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      nameError: validation.validate('name', state.name),
    }));
  }, [state.name, validation]);

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      emailError: validation.validate('name', state.email),
    }));
  }, [state.email, validation]);

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      passwordError: validation.validate('password', state.password),
    }));
  }, [state.password, validation]);

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      ),
    }));
  }, [state.passwordConfirmation, validation]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Sign up</h2>
          <Input type="text" name="name" placeholder="Type your name" />

          <Input type="email" name="email" placeholder="Type your email" />

          <Input
            type="password"
            name="password"
            placeholder="Type your password"
          />

          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repite your password"
          />

          <button
            data-testid="submit"
            disabled={
              !!state.emailError ||
              !!state.passwordError ||
              !!state.nameError ||
              !!state.passwordConfirmationError ||
              state.isLoading
            }
            className={Styles.submit}
            type="submit"
          >
            Login
          </button>
          <span className={Styles.link}>Already have an account?</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Signup;
