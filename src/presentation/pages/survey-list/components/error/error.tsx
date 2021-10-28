import React, { useContext } from 'react';
import { SurveyContext } from '..';
import Styles from './styles-module.scss';

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext);

  const onClick = (): void => {
    setState({ surveys: [], error: null, reload: !state.reload });
  };

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button onClick={onClick} data-testid="reload-button" type="button">
        Load again
      </button>
    </div>
  );
};

export default Error;
