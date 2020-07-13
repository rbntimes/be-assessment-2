import React from 'react';
import { Formik } from 'formik';
import Router from 'next/router';

import styled from 'styled-components';

import { H1, Label } from '../components/Typography';
import Input from '../components/Input';
import Button from '../components/Button';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
`;

const Register = () => (
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
      await response.json();

      return Router.push('/');
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
      <Form onSubmit={handleSubmit}>
        <H1>Register</H1>
        <Label>
          Username:
          <Input
            type="username"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
        </Label>
        {errors.username && touched.username && errors.username}
        <Label>
          Password:
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </Label>
        {errors.password && touched.password && errors.password}
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export default Register;
