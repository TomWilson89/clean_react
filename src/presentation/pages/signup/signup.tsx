import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import Styles from './signup-styles.scss';
import {
  SignupFormStatus,
  SignupInput,
  signupState,
  SignupSubmitButton,
} from './components';
import { AddAccount } from '@/domain/usecases';
import {
  currentAccountState,
  Footer,
  PublicHeader,
} from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validations';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const resetLoginState = useResetRecoilState(signupState);
  const [state, setState] = useRecoilState(signupState);
  const history = useHistory();
  const { setCurrentAccount } = useRecoilValue(currentAccountState);

  useEffect(() => {
    resetLoginState();
  }, []);

  useEffect(() => {
    const formData = {
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    };
    const nameError = validation.validate('name', formData);
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
    );
    setState((oldState) => ({
      ...oldState,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!emailError ||
        !!nameError ||
        !!passwordConfirmationError ||
        !!passwordError,
    }));
  }, [
    state.email,
    state.name,
    state.password,
    state.passwordConfirmation,
    validation,
  ]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState((oldState) => ({ ...oldState, isLoading: true }));
      const account = await addAccount.add({
        email: state.email,
        name: state.name,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
      setCurrentAccount(account);
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
    <div className={Styles.signupWrap}>
      <PublicHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <SignupInput type="text" name="name" placeholder="Type your name" />

        <SignupInput type="email" name="email" placeholder="Type your email" />

        <SignupInput
          type="password"
          name="password"
          placeholder="Type your password"
        />

        <SignupInput
          type="password"
          name="passwordConfirmation"
          placeholder="Repite your password"
        />

        <SignupSubmitButton text="Sign up" />
        <Link
          replace
          to="/login"
          data-testid="login-link"
          className={Styles.link}
        >
          Already have an account?
        </Link>
        <SignupFormStatus />
      </form>

      <Footer />
    </div>
  );
};

export default Signup;
