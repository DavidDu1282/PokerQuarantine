import React  from 'react';

import UserPanel from './UserPanel'
import App from '../../App'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<UserPanel />', () => {
  it('renders without errors', () => {
    const app = shallow(<App/>);
    const client = app.instance();
    const wrapper = shallow(<UserPanel client={client} />);
  });
});
