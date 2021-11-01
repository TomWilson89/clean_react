import React from 'react';
import Styles from './styles-module.scss';

type Props = {
  error: string;
  reload: () => void;
};

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button onClick={reload} data-testid="reload-button" type="button">
        Load again
      </button>
    </div>
  );
};

export default Error;
