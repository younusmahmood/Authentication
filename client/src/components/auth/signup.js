import React, { Component } from 'react';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';


const renderInput = field => (
  <div>
    <input {...field.input} type={field.type} className='form-control'/>
    {field.meta.touched &&
      field.meta.error &&
      <div className='error'>{field.meta.error}</div>
    }
  </div>
)

class Signup extends Component{

  handleFormSubmit(formProps){
    this.props.signupUser(formProps)
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className='form-group'>
          <label htmlFor='email'>Email: </label>
          <Field name='email' component={renderInput} type='text' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <Field name='password' component={renderInput} type='password' />
        </div>
        <div className='form-group'>
          <label htmlFor='passwordConfirm'>Confirm Password: </label>
          <Field name='passwordConfirm' component={renderInput} type='password' />
        </div>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign Up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Required';
  }

  if (!formProps.password) {
    errors.password = 'Required';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  }


  if (formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  return errors;
}

Signup = reduxForm({form: 'signup', validate})(Signup)

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default connect(mapStateToProps, actions)(Signup);
