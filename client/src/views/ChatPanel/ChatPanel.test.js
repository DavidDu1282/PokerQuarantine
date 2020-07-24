import React  from 'react';

import ChatPanel from './ChatPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<ChatPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<ChatPanel fields={{}} button='' />);
  });
});
