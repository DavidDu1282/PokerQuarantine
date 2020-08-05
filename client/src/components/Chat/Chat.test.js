import React  from 'react';
import App from '../../App'
import Chat from './Chat'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<Chat />', () => {
  it('renders without errors', () => {
    const app = shallow(<App />);
    const client = app.instance();
    const wrapper = shallow(<Chat client={client} />);
  });
});
