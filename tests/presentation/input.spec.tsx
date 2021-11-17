import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { InputBase } from '@/presentation/components';

const makeSut = (fieldName: string): RenderResult => {
  return render(<InputBase name={fieldName} state={{}} setState={null} />);
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
