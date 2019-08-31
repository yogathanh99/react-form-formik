import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Fab,
} from '@material-ui/core';

class SignupForm extends Component {
  render() {
    const { errors, touched, handleChange, isSubmitting } = this.props;
    return (
      <Grid container justify='center' alignContent='center'>
        <Grid item xs={6} md={4}>
          <Paper
            elevation={4}
            style={{ padding: '20px 15px', marginTop: '30px' }}
          >
            <Typography gutterBottom align='center'>
              Sign Up
            </Typography>
            <Form>
              <FormControl
                fullWidth
                margin='normal'
                error={touched.username && !!errors.username}
              >
                <InputLabel>Username</InputLabel>
                <Field
                  name='username'
                  render={({ field }) => <Input fullWidth {...field} />}
                />
                {touched.username && errors.username && (
                  <FormHelperText>{errors.username}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                margin='normal'
                error={touched.email && !!errors.email}
              >
                <InputLabel>Email</InputLabel>
                <Field
                  name='email'
                  render={({ field }) => <Input fullWidth {...field} />}
                />
                {touched.email && errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                margin='normal'
                error={touched.password && !!errors.password}
              >
                <InputLabel>Password</InputLabel>
                <Field
                  name='password'
                  render={({ field }) => (
                    <Input fullWidth type='password' {...field} />
                  )}
                />
                {touched.password && errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin='normal'>
                <InputLabel>Plan</InputLabel>
                <Select
                  displayEmpty
                  name='plan'
                  value={this.props.values.plan}
                  onChange={handleChange}
                >
                  <MenuItem value='basic'>Basic</MenuItem>
                  <MenuItem value='advance'>Advance</MenuItem>
                  <MenuItem value='enterprise'>Enterprise</MenuItem>
                </Select>
              </FormControl>

              <Field
                name='receiveLetter'
                type='checkbox'
                checked={this.props.values.receiveLetter}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label='Receive new letter'
                  />
                )}
              />

              <FormControl fullWidth margin='normal'>
                <Fab
                  variant='extended'
                  color='primary'
                  type='submit'
                  onClick={this.props.handleSubmit}
                  disabled={isSubmitting}
                >
                  Sign up
                </Fab>
              </FormControl>
            </Form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: () => ({
    username: '',
    email: '',
    password: '',
    receiveLetter: true,
    plan: 'basic',
  }),
  validationSchema: Yup.object().shape({
    // Validate form field
    username: Yup.string()
      .required('Username is required')
      .min(5, 'Username must have min 5 characters')
      .max(10, 'Username have max 10 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must have min 8 characters'),
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    // Handle submit form
    setTimeout(() => {
      if (values.email === 'vtthanh99@gmail.com') {
        setErrors({ email: 'Email already taken' }); // Set error bag
      } else {
        resetForm(); // Clear form data
      }
      setSubmitting(false); // Set isSubmitting to false
    }, 1000);
  },
})(SignupForm);

export default FormikForm;
