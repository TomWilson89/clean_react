import {
  Context,
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import React, { useState } from 'react';
import Styles from './signup-styles.scss';

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Required',
    emailError: 'Required',
    passwordConfirmationError: 'Required',
    passwordError: 'Required',
    mainError: '',
  });

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
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
            disabled
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
