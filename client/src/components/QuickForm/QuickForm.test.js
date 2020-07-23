import React from 'react';
import QuickForm from './QuickForm'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { 
  TextField,
  FormControlLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

describe('<QuickForm />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<QuickForm fields={{}} button='' />);
  });


  it('renders textfields without errors', () => {
    const wrapper = shallow(<QuickForm fields={{
      'test1': { label: 'test1', type: 'text' },
      'test2': { label: 'test2', type: 'number' },
    }} button='' />);

    expect(wrapper.find(TextField)).to.have.lengthOf(2);
    expect(wrapper.html()).to.include('test1');
    expect(wrapper.html()).to.include('test2');
  });

  it('renders checkboxes without errors', () => {
    const wrapper = shallow(<QuickForm fields={{
      'test1': { label: 'test1', type: 'checkbox' },
    }} button='' />);

    expect(wrapper.find(FormControlLabel)).to.have.lengthOf(1);
    expect(wrapper.html()).to.include('test1');
  });
  
  it('renders dates without errors', () => {
    const wrapper = shallow(<QuickForm fields={{
      'test1': { label: 'test1', type: 'date' },
    }} button='' />);

    expect(wrapper.find(DatePicker)).to.have.lengthOf(1);
    expect(wrapper.html()).to.include('test1');
    
  });

  it('renders select without errors', () => {
    const wrapper = shallow(<QuickForm fields={{
      'test1': { label: 'test1', type: 'select', selectOptions: { 'one': 1, 'two': 2 } },
    }} button='' />);

    expect(wrapper.find(Select)).to.have.lengthOf(1);
    expect(wrapper.find(MenuItem)).to.have.lengthOf(2);
    expect(wrapper.html()).to.include('test1');
  });

  
  it('sets custom field values for textfields', () => {
    const wrapper = shallow(<QuickForm fields={{
      'test1': { label: 'test1', type: 'text', test_field: 'foo'},
    }} button='' />);

    expect(wrapper.find(TextField)).to.have.lengthOf(1);
    expect(wrapper.find(TextField).first().props().test_field).to.equal('foo');
  });

  it('sets custom field values for dates', () => {
    const wrapper = shallow(<QuickForm fields={{
      'test1': { label: 'test1', type: 'date', test_field: 'foo' },
    }} button='' />);

    expect(wrapper.find(DatePicker)).to.have.lengthOf(1);
    expect(wrapper.find(DatePicker).first().props().test_field).to.equal('foo');
  });

  it('sets custom field values for select', () => {
    const wrapper = shallow(<QuickForm fields={{
      'test1': { label: 'test1', type: 'select', selectOptions: { 'one': 1 }, test_field: 'foo' },
    }} button='' />);

    expect(wrapper.find(Select)).to.have.lengthOf(1);
    expect(wrapper.find(Select).first().props().test_field).to.equal('foo');
  });


  it('returns correct value for select', () => {
    const wrapper = shallow(<QuickForm fields={{
      'test1': { label: 'test1', type: 'select', selectOptions: { 'one': 1, 'two': 2 }},
    }} button='button' />);

    expect(wrapper.find(Select)).to.have.lengthOf(1);

    let field = wrapper.find(Select).first();

    let instance = wrapper.instance();
    let e = {
      preventDefault: jest.fn
    };

    // null on return when not found

    let submit_null = instance.handleSubmit(e);
    expect(submit_null).to.equal(null);
    expect(wrapper.html()).to.include('empty');

    // returns values when selects
    wrapper.find(Select).simulate('change', { 
      target: {
        value: 1,
        getAttribute: (propName) => {
          return field.props()[propName];
        }
      } 
    });

    expect(wrapper.html()).to.include('one');

    let submit_1 = instance.handleSubmit(e);
    expect(submit_1.body.test1).to.equal(1);

    wrapper.find(Select).simulate('change', {
      target: {
        value: 2,
        getAttribute: (propName) => {
          return field.props()[propName];
        }
      } 
    });

    expect(wrapper.html()).to.include('two');

    let submit_2 = instance.handleSubmit(e);
    expect(submit_2.body.test1).to.equal(2);

  })

});
