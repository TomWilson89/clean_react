import { Context, Input } from '@/presentation/components';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    );
    const input = screen.getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
