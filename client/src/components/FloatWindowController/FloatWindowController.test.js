import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { FloatWindowController } from '..';

describe('<FloatWindowController />', () => {
  it('renders without error', () => {
    shallow(<FloatWindowController windows={{}}></FloatWindowController>);
  });
});