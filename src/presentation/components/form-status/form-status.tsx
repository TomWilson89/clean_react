import React, { useContext } from 'react';
import Context from '../context/form/form-context';
import Spinner from '../spinner/spinner';
import Styles from './form-status.scss';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context);

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
