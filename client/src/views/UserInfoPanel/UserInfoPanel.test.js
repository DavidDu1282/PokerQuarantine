import React  from 'react';

import UserInfoPanel from './UserInfoPanel'
import App from '../../App'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<UserInfoPanel />', () => {
  it('renders without errors', () => {
    const app = shallow(<App/>);
    const client = app.instance();
    const wrapper = shallow(<UserInfoPanel client={client} />);
  });
});
