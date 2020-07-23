import React  from 'react';

import LeaderBoardPanel from './LeaderBoardPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<LeaderBoardPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<LeaderBoardPanel fields={{}} button='' />);
  });
});
