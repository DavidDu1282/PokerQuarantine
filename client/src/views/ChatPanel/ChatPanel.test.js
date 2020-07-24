import React  from 'react';
import App from '../../App'
import ChatPanel from './ChatPanel'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<ChatPanel />', () => {
  it('renders without errors', () => {
    const app = shallow(<App/>);
    const client = app.instance();
    const wrapper = shallow(<ChatPanel client={client} />);
  });
});
