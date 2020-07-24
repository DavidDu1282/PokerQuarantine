import React  from 'react';

import MatchPanel from './MatchPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<MatchPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<MatchPanel fields={{}} button='' />);
  });
});
