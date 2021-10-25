import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';

export const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisable = (
  fieldName: string,
  isDisable: boolean
): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement;
  if (isDisable) {
    expect(button).toBeDisabled();
    return;
  }
  expect(button).toBeEnabled();
};

export const testFieldStatus = (
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || '');
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢');
};

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, {
    target: { value },
  });
};

export const testElementExists = (fieldName: string): void => {
  const el = screen.getByTestId(fieldName);
  expect(el).toBeInTheDocument();
};
