import { atom } from 'recoil';

export const signupState = atom({
  key: 'signupState',
  default: {
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
  },
});
