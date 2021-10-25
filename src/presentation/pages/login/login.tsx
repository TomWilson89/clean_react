import { Authentication, SaveAccessToken } from '@/domain/usecases';
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
  saveAccessToken: SaveAccessToken;
};

const Login: React.FC<Props> = ({
  validation,
  authenticacion,
  saveAccessToken,
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
    const emailError = validation.validate('email', state.email);
    const passwordError = validation.validate('password', state.password);
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

      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };

  return (
    <div className={Styles.login}>
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
