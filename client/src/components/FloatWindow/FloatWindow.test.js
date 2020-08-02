import React from 'react';
import FloatWindow from './FloatWindow';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('<FloatWindow />', () => {
  it('renders without error', () => {
    shallow(<FloatWindow variant="full"></FloatWindow>);
    shallow(<FloatWindow variant="transparent"></FloatWindow>);
  });

  it('displays content correctly', () => {
    const window = shallow(<FloatWindow label='testWindow' variant="full">test</FloatWindow>);
    const transparent = shallow(<FloatWindow label='testTransparent' variant="full">test transparent</FloatWindow>);

    expect(window.html()).to.include('test');
    expect(window.html()).to.include('testWindow');
    expect(transparent.html()).to.include('testTransparent');
  });
});