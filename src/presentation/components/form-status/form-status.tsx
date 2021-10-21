import React, { useContext } from 'react';
import Context from '../context/form/form-context';
import Spinner from '../spinner/spinner';
import Styles from './form-status.scss';

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context);
  const { isLoading } = state;
  const { main } = errorState;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {main && <span className={Styles.error}>{main}</span>}
    </div>
  );
};

export default FormStatus;
