import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';

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

const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  border-radius: 3px;
  text-decoration: none;
  background: pink;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  margin-bottom: 3px;
`;

function User({ user, map }) {
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
            <input
              type="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
          </Label>

          <Label>
            Age:
            <select
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
            </select>
          </Label>

          <Label>
            Gender:
            <select
              type="gender"
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Label>

          <Label>
            Minimum age:
            <select
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
            </select>
          </Label>

          <Label>
            Maximum age:
            <select
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
            </select>
          </Label>

          <Label>
            Preferably:
            <select
              type="prefers"
              name="prefers"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.prefers}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Label>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
          <a href="/logout">Sign out</a>
        </Form>
      )}
    </Formik>
  );
}

export default User;
