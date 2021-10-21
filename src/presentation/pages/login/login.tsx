import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/components/context/form/form-context';
import React, { useState } from 'react';
import Styles from './login-styles.scss';

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
  });

  const [errorState] = useState({
    email: 'Required',
    password: 'Required',
    main: '',
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
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
