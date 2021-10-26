import { Authentication, UpdateCurrentAccount } from '@/domain/usecases';
import {
  Context,
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton,
} from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validations';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
  authenticacion: Authentication;
  updateCurrentAccount: UpdateCurrentAccount;
};

const Login: React.FC<Props> = ({
  validation,
  authenticacion,
  updateCurrentAccount,
}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    emailError: '',
    passwordError: '',
    mainError: '',
    email: '',
    password: '',
    isFormInvalid: true,
  });

  const history = useHistory();

  useEffect(() => {
    const formData = {
      email: state.email,
      password: state.password,
    };
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);
    setState((oldState) => ({
      ...oldState,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    }));
  }, [state.email, state.password, validation]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authenticacion.auth({
        email: state.email,
        password: state.password,
      });

      await updateCurrentAccount.save(account);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Type your email" />
          <Input
            type="password"
            name="password"
            placeholder="Type your password"
          />

          <SubmitButton text="Login" />
          <Link
            replace
            to="/signup"
            data-testid="signup-link"
            className={Styles.link}
          >
            Don&apos;t have an account?
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
