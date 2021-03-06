import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { Authentication } from '@/domain/usecases';
import {
  currentAccountState,
  Footer,
  PublicHeader,
} from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validations';
import {
  LoginFormStatus,
  LoginInput,
  loginState,
  LoginSubmitButton,
} from './components';
import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const resetLoginState = useResetRecoilState(loginState);
  const [state, setState] = useRecoilState(loginState);

  const history = useHistory();
  const { setCurrentAccount } = useRecoilValue(currentAccountState);

  useEffect(() => {
    resetLoginState();
  }, []);

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
      setState((oldState) => ({ ...oldState, isLoading: true }));
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      await setCurrentAccount(account);
      history.replace('/');
    } catch (error) {
      setState((oldState) => ({
        ...oldState,
        isLoading: false,
        mainError: error.message,
      }));
    }
  };

  return (
    <div className={Styles.loginWrap}>
      <PublicHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <LoginInput type="email" name="email" placeholder="Type your email" />
        <LoginInput
          type="password"
          name="password"
          placeholder="Type your password"
        />

        <LoginSubmitButton text="Login" />
        <Link
          replace
          to="/signup"
          data-testid="signup-link"
          className={Styles.link}
        >
          Don&apos;t have an account?
        </Link>
        <LoginFormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default Login;
