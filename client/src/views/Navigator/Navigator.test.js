import React  from 'react';

import Navigator from './Navigator'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<NavigatorPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<Navigator fields={{}} button='' />);
  });
});
