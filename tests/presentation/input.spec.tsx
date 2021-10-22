import { Context, Input } from '@/presentation/components';
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
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
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
});
