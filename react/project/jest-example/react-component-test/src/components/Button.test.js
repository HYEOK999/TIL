import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('Button 컴포넌트', () => {
  it('컴포넌트가 정상적으로 생성된다.', () => {
    render(<Button />);
  });

  it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다`, () => {
    const { getByText } = render(<Button />);
    const button = getByText('button');
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
    // Given
    const { getByText } = render(<Button />);
    const button = getByText('button');

    // When
    fireEvent.click(button);

    // Then
    const p = getByText('버튼이 방금 눌렸다.');
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it(`버튼이 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    // Given
    const { getByText } = render(<Button />);

    // When

    // Then
    const p = getByText('버튼이 눌리지 않았다.');
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리 않았다." 라고 쓰여진다.`, () => {
    // Given
    const { getByText } = render(<Button />);
    const button = getByText('button');
    fireEvent.click(button);

    // When
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    // jest.advanceTimersByTime(5000);

    // Then
    const p = getByText('버튼이 눌리지 않았다.');
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
    // Given
    const { getByText } = render(<Button />);
    const button = getByText('button');
    fireEvent.click(button);

    // expect(button.disabled).toBe(true);
    expect(button).toBeDisabled(true);
    // When
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(button).toBeEnabled();
  });
});
