import { AddAccount } from '@/domain/usecases';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton,
} from '@/presentation/components';
import { ApiContext, FormContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validations';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Styles from './signup-styles.scss';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
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
    isFormInvalid: true,
  });
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);

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
      setState({ ...state, isLoading: true });
      const account = await addAccount.add({
        email: state.email,
        name: state.name,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
      setCurrentAccount(account);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
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

          <SubmitButton text="Sign up" />
          <Link
            replace
            to="/login"
            data-testid="login-link"
            className={Styles.link}
          >
            Already have an account?
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Signup;
