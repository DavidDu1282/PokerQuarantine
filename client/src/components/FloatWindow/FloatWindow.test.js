import React from 'react';
import FloatWindow from './FloatWindow';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('<FloatWindow />', () => {
  it('renders without error', () => {
    shallow(<FloatWindow movable></FloatWindow>);
    shallow(<FloatWindow movable closable></FloatWindow>);
  });

  it('displays content correctly', () => {
    const window = shallow(<FloatWindow label='testWindow' movable>test</FloatWindow>);
    const closable = shallow(<FloatWindow label='testWindowClosable' movable closable>test closable</FloatWindow>);

    expect(window.html()).to.include('test');
    expect(closable.html()).to.include('testWindowClosable');
    expect(closable.html()).to.include('test closable');
  });
});