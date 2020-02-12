import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';
import { act } from 'react-dom/test-utils';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe('Button 컴포넌트', () => {
  it('컴포넌트가 정상적으로 생성된다.', () => {
    shallow(<Button />);
  });

  it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다`, () => {
    const wrapper = shallow(<Button />);
    const button = wrapper.find('button');
    // console.log(button);
    expect(button.text()).toBe('button');
  });

  it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
    // Given
    const wrapper = shallow(<Button />);
    const button = wrapper.find('button');

    // When
    act(() => {
      button.simulate('click');
    });

    // Then
    const p = wrapper.find('p');
    expect(p.text()).toBe('버튼이 방금 눌렸다.');
  });

  it(`버튼이 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    // Given
    const wrapper = shallow(<Button />);

    // When

    // Then
    const p = wrapper.find('p');
    expect(p.text()).toBe('버튼이 눌리지 않았다.');
  });

  it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리 않았다." 라고 쓰여진다.`, () => {
    // Given
    const wrapper = shallow(<Button />);
    const button = wrapper.find('button');
    button.simulate('click');

    // When
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    // jest.advanceTimersByTime(5000);

    // Then
    const p = wrapper.find('p');
    expect(p.text()).toBe('버튼이 눌리지 않았다.');
  });

  it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
    // Given
    const wrapper = shallow(<Button />);
    const button = wrapper.find('button');
    button.simulate('click');

    // console.log(button.props().disabled);
    // console.log(button.props('disabled'));
    expect(wrapper.find('button').prop('disabled')).toBe(true);

    // expect(button.disabled).toBe(true);
    // expect(button).toBeDisabled(true);
    // When
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // expect(button).toBeEnabled();
    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });
});
