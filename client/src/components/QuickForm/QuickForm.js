import React from 'react';
import {
  TextField,
  FormControlLabel,
  FormHelperText,
  Grid,
  Button,
  Typography,
  Checkbox
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

class QuickForm extends React.Component {
  /**
   * Builds a simple form from object
   * const { fields, variant, button, onSubmit, name, ...others } = props;
   * onSubmit = onSubmit(result)
   * fields = {'name': {
   *          label: 'label' ,
   *          type: 'text' | 'password' | 'number' | 'date' | 'checkbox'
   * }}
   */

  constructor(props) {
    super(props);

    const field_values = {};
    const error_states = {};

    for (const [field_name, options] of Object.entries(this.props.fields)) {
      if (typeof(options.type) === typeof('')) {
        switch (options.type) {
          case 'checkbox':
            field_values[field_name] = false;
            error_states[field_name] = '';
            break;
          case 'date':
            error_states[field_name] = '';
            let date = moment();
            field_values[field_name] = date;
            break;
          default:
            error_states[field_name] = '';
            field_values[field_name] = '';
        }
      }
    }

    this.state = {
      field_values: field_values,
      error_states: error_states
    };
  }

  setErrorState(name, state) {
    const error_states_ = Object.assign({}, this.state.error_states);
    error_states_[name] = state;

    this.setState((state) => {
      return { 
        error_states: error_states_
      };
    })
  }

  setValue(name, value) {
    const field_values_ = Object.assign({}, this.state.field_values);
    field_values_[name] = value;

    this.setState((state) => {
      return { 
        field_values: field_values_
      };
    })
  }

  checkEmpty(data) {
    /**
     * Check if any field in the given data obj is empty
     * returns true if one field is empty, false otherwise
     * Set error state to empty if found
     */

    for (const [key, value] of Object.entries(data)) {
      if (value === '') {
        this.setErrorState(key, `This field must not be empty.`);
        return true;
      }
    }
    return false;
  }

  handleChange(e) {
    /**
     * Update field values, check for error
     */

    let name = e.target.getAttribute('name');
    let type = e.target.getAttribute('type');
    if (type === 'checkbox') {

      this.setValue(name, e.target.checked);
    } else {
      this.setValue(name, e.target.value);
    }

    // errors
    if ( type !== 'checkbox' && e.target.value === '') {
      this.setErrorState(name, `This field must not be empty.`);
    } else {
      this.setErrorState(name, '');
    }
  }

  handleDateChange(name, date) {
    /**
     * Update date
     */

    this.setValue(name, date);
    this.setErrorState(name, '');
  }

  handleSubmit(e) {
    /**
     * returns the data of this form
     * return null if error
     */

    e.preventDefault();

    if (this.checkEmpty(this.state.field_values)) {
      return null;
    }

    return {
      form: this,
      body: this.state.field_values
    };
  }

  render() {
    const { fields, tBoxVariant, button, onSubmit, name, ...others } = this.props;
    const fields_display = [];

    // construct form
    for (const [field_name, options] of Object.entries(fields)) {
      const { label, type, ...fieldSettings } = options;
      
      if (typeof(type) === typeof('')) {
        switch (type) {
          case 'checkbox':
            fields_display.push(
              <Grid item xs key={field_name}>
                <FormControlLabel 
                  control={<Checkbox
                    name={field_name}
                    checked={this.state.field_values[field_name]}
                    onChange={e => this.handleChange(e)}  
                    color="primary"
                    size="small"
                    {...fieldSettings}
                  />}
                  label={<Typography variant="body2">{label}</Typography>}
                /><br/>
                <FormHelperText
                  variant={tBoxVariant}
                  error={(this.state.error_states[field_name] === '') ? false : true}
                >
                  {this.state.error_states[field_name]}
                </FormHelperText>
              </Grid>
            );
            break;
          case 'date':
            fields_display.push(
              <Grid item xs key={field_name}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  fullWidth
                  name={field_name}
                  variant="inline"
                  inputVariant={tBoxVariant}
                  format="MMMM DD, yyyy"
                  margin="normal"
                  label={label}
                  value={this.state.field_values[field_name]}
                  onChange={(date) => this.handleDateChange(field_name, date)}
                  error={(this.state.error_states[field_name] === '') ? false : true}
                  helperText={this.state.error_states[field_name]}
                  {...fieldSettings}
                />
              </MuiPickersUtilsProvider>
              </Grid>
            )
            break;
          default:
            fields_display.push(
              <Grid item xs key={field_name}>
                <TextField 
                  label={label}
                  name={field_name}
                  variant={tBoxVariant}
                  type={options.type}
                  value={this.state.field_values[field_name]}
                  error={(this.state.error_states[field_name] === '') ? false : true}
                  helperText={this.state.error_states[field_name]}
                  margin="normal"
                  onChange={(e) => this.handleChange(e)}
                  fullWidth
                  {...fieldSettings}
                />
              </Grid>
            );
        }
      } else {
        // custom *styling* component (no input return and no error handling)
        const CustomField = options.type;
        
        fields_display.push(
          <Grid item xs key={field_name}>
            <CustomField />
          </Grid>
        );
      }

    }

    // button row

    if (typeof(button) === typeof('')) {
      // string button
      fields_display.push(
        <Grid item xs key="button">
          <Button type="submit" fullWidth>{button}</Button>
        </Grid>
      );
    } else {
      // node button(row)
      fields_display.push(button);
    };

    return (
      <Grid
        container
        direction="column"
        spacing={0}
        {...others}
      >
        <form noValidate onSubmit={e => onSubmit(this.handleSubmit(e))}>
          {fields_display}
        </form>
      </Grid>
    );
  }
}

export default QuickForm;
