import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import Router from 'next/router';

import { useCurrentUser } from '../lib/hooks';

import Select from './Select';
import Input from './Input';
import Button from './Button';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
`;

const Label = styled.label`
  display: grid;
  grid-row: auto;
  font-size: 16px;
`;

function User({ user, map }) {
  const [_, { mutate }] = useCurrentUser();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);

    return Router.push('/');
  };
  return (
    <Formik
      initialValues={{ ...user }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values) => {
        const response = await fetch('/api/user', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        return response.json();
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <img alt="Jouw voorkeuren" src={map} />
          <Label>
            Naam:
            <Input
              type="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
          </Label>

          <Label>
            Age:
            <Select
              type="age"
              name="age"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
            >
              {Array(80 - 18)
                .fill((i) => i)
                .map((_, index) => (
                  <option value={index + 18}>{index + 18}</option>
                ))}
            </Select>
          </Label>

          <Label>
            Gender:
            <Select
              type="gender"
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </Label>

          <Label>
            Minimum age:
            <Select
              type="minAge"
              name="minAge"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.minAge}
            >
              {Array(80 - 18)
                .fill((i) => i)
                .map((_, index) => (
                  <option value={index + 18}>{index + 18}</option>
                ))}
            </Select>
          </Label>

          <Label>
            Maximum age:
            <Select
              type="maxAge"
              name="maxAge"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.maxAge}
            >
              {Array(80 - 18)
                .fill((i) => i)
                .map((_, index) => (
                  <option value={index + 18}>{index + 18}</option>
                ))}
            </Select>
          </Label>

          <Label>
            Preferably:
            <Select
              type="prefers"
              name="prefers"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.prefers}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </Label>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
          <a onClick={handleLogout}>Logout</a>
        </Form>
      )}
    </Formik>
  );
}

export default User;
