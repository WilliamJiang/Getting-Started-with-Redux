import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
const { DOM: { input } } = React
//const { DOM: { input, select, textarea } } = React;
import 'react-widgets/dist/css/react-widgets.css'

const validateUsers = ['william', 'bill', 'admin', 'root'];

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const submit = values => {
  return sleep(1000) // simulate server latency
    .then(() => {
      if (!validateUsers.includes(values.username)) {
        throw new SubmissionError({username: 'User does not exist', _error: 'Login failed!'})
      } else if (['redux-form', ''].indexOf(values.password) === -1) {
        throw new SubmissionError({password: 'Wrong password', _error: 'Login failed!'})
      } else {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      }
    })
}


let SubmitValidationForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <Field name="username" component={username =>
          <div>
            <input type="text" {...username} placeholder="Username"/>
            {username.touched && username.error && <span>{username.error}</span>}
          </div>
        }/>
      </div>
      <div>
        <label>Password</label>
        <Field name="password" component={password =>
          <div>
            <input type="password" {...password} placeholder="Password"/>
            {password.touched && password.error && <span>{password.error}</span>}
          </div>
        }/>
      </div>
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>Log In</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

SubmitValidationForm = reduxForm({
  form: 'submitValidation'  // a unique identifier for this form
})(SubmitValidationForm)


class loginForm extends Component {

  constructor(props) {
    super(props);
    /**
     * setState(...): Can only update a mounted or mounting component.
     * This usually means you called setState() on an unmounted component. This is a no-op.
     this.setState({
      validateUsers: ['william', 'bill', 'admin', 'root']
    });
     */
  }

  render() {
    return (
      <div className="container">
        <SubmitValidationForm onSubmit={submit}/>
      </div>
    )
  }
}

export default loginForm;
