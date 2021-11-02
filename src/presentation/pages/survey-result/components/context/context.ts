import { createContext } from 'react';

type Props = {
  onAnswer: (accounanswer: string) => void;
};

export default createContext<Props>(null);
