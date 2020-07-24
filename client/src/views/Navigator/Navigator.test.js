import React  from 'react';
import App from '../../App'
import Navigator from './Navigator'
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<Navigator />', () => {
  it('renders without errors', () => {
    const app = shallow(<App/>);
  });
});
