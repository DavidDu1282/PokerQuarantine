import React  from 'react';

import InviteFriendPanel from './InviteFriendPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<InviteFriendPanel />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<InviteFriendPanel fields={{}} button='' />);
  });
});
