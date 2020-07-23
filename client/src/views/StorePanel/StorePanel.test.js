import React  from 'react';

import StorePanel from './StorePanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<StorePanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<StorePanel fields={{}} button='' />);
  });
});
