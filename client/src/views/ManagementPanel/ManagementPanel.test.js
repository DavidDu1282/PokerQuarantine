import React  from 'react';

import ManagementPanel from './ManagementPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<ManagementPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<ManagementPanel fields={{}} button='' />);
  });
});
