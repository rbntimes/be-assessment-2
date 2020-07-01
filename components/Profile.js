import React from 'react';
import { Formik } from 'formik';

function User({ user }) {
  return (
    <div>
      <h2>Your settings </h2>
      <p>
        Don't worry, no one will see any of this untill you match. Then your
        name and profile picture will be shown
      </p>
      <Formik
        initialValues={{ ...user }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await fetch('/api/user', {
            method: 'PATCH',
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
            <label>
              Naam:
              <input
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </label>

            <label>
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
            </label>

            <label>
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
            </label>

            <label>
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
            </label>

            <label>
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
            </label>

            <label>
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
            </label>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <a href="/logout">Sign out</a>
    </div>
  );
}

export default User;

// <option <%= selected === '5000' ? selected="selected" : '' %> value=5000>5</option>
// <option <%= selected === '10000' ? selected="selected" : '' %> value=10000>10</option>
// <option <%= selected === '20000' ? selected="selected" : '' %> value=20000>20</option>
// <option <%= selected === '50000' ? selected="selected" : '' %> value=50000>50</option>
// <option <%= selected === '100000' ? selected="selected" : '' %> value=100000>100</option>
// <option <%= selected === '150000' ? selected="selected" : '' %> value=150000>150</option>
