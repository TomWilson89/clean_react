import { Input } from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import faker from 'faker';
import React from 'react';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </FormContext.Provider>
  );
};

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const fieldName = faker.database.column();
    makeSut(fieldName);
    const input = screen.getByTestId(fieldName) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test('should remove readOnly on focus', () => {
    const fieldName = faker.database.column();
    makeSut(fieldName);
    const input = screen.getByTestId(fieldName) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });

  test('should focus input on label click', () => {
    const fieldName = faker.database.column();
    makeSut(fieldName);
    const input = screen.getByTestId(fieldName);
    const label = screen.getByTestId(`${fieldName}-label`);
    fireEvent.click(label);
    expect(input).toHaveFocus();
  });
});
