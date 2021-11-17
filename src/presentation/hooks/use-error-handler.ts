import { useLogout } from './use-logout';
import { AccessDeniedError } from '@/domain/errors';

type CallBackType = (error: Error) => void;
type ResultType = (error: Error) => void;

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const logout = useLogout();
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout();
    } else {
      callback(error);
    }
  };
};
