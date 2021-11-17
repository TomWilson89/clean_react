import { render, screen } from '@testing-library/react';
import React from 'react';
import { Calendar } from '@/presentation/components';

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />);
};
describe('Calendar', () => {
  test('should render with correct values ', () => {
    makeSut(new Date('2020-01-10T00:00:00'));

    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('ene');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });

  test('should render with correct values ', () => {
    makeSut(new Date('2019-02-03T00:00:00'));

    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('feb');
    expect(screen.getByTestId('year')).toHaveTextContent('2019');
  });
});
