import React  from 'react';

import NavigatorPanel from './NavigatorPanel '
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<NavigatorPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<NavigatorPanel fields={{}} button='' />);
  });
});
