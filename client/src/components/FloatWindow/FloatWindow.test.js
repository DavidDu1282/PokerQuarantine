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
    const window = shallow(<FloatWindow name='testWindow' variant="full" display x={0} y={0} width={500} height={500} z={1}>test</FloatWindow>);
    const transparent = shallow(<FloatWindow name='testTransparent' variant="full" display x={0} y={0} width={500} height={500} z={1}>test transparent</FloatWindow>);

    expect(window.html()).to.include('test');
    expect(window.html()).to.include('testWindow');
    expect(transparent.html()).to.include('testTransparent');
  });
});