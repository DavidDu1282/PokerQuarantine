import React  from 'react';

import NewsPanel from './NewsPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<NewsPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<NewsPanel fields={{}} button='' />);
  });
});
