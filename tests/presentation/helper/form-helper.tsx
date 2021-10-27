import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';

export const testFieldStatus = (
  fieldName: string,
  validationError = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const label = screen.getByTestId(`${fieldName}-label`);
  const field = screen.getByTestId(`${fieldName}`);

  expect(wrap).toHaveAttribute(
    'data-status',
    validationError ? 'invalid' : 'valid'
  );
  expect(field).toHaveProperty('title', validationError);
  expect(label).toHaveProperty('title', validationError);
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
