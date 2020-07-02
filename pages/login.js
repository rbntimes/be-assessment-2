import React from 'react';
import { Formik } from 'formik';

import { H1 } from '../components/Typography';

const Login = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validate={(values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Required';
      }
      return errors;
    }}
    onSubmit={async (values) => {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      return response.json();
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    }) => (
      <form onSubmit={handleSubmit}>
        <H1>Login</H1>

        <input
          type="username"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
        {errors.username && touched.username && errors.username}
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && touched.password && errors.password}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )}
  </Formik>
);

export default Login;
