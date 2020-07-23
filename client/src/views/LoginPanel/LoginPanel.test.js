import React  from 'react';

import LoginPanel from './LoginPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<LoginPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<LoginPanel fields={{}} button='' />);
  });
});
