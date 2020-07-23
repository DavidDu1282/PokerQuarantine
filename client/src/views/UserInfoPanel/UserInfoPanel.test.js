import React  from 'react';

import UserInfoPanel from './UserInfoPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<UserInfoPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<UserInfoPanel fields={{}} button='' />);
  });
});
