import React, { useEffect, useState } from 'react';
// import { useCurrentUser } from '../../lib/hooks';
import Endless from '../../components/Endless';
// import User from '../../components/User';
// import List from '../../components/List';
// import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Formik } from 'formik';
// import { applySession } from 'next-session';
import fetcher from '../../lib/fetch';
// import { getUser } from '../../lib/db';
// import queryString from 'query-string';
// import middleware from '../../middlewares/middleware';
// import fetch from 'isomorphic-unfetch';

function Page() {
  const { data, mutate, error } = useSWR('/api/question', fetcher);
  const [status, setStatus] = useState(undefined);

  if (!data || !(typeof data === 'object')) {
    return <Endless />;
  }
  console.log(data);
  return (
    <span>
      <Formik
        enableReinitialize
        initialValues={{
          questionId: data?._id,
          question: data?.question,
          answer: undefined,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          const response = await fetch('/api/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });

          if (response.status === 201) {
            mutate('/api/question');
          }
          return response.json();
          setSubmitting(false);
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
          setFieldValue,
          submitForm,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <label>{data?.question}</label>
            {data?.answers.map((answer) => (
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  checked={values.answer === answer}
                  onChange={async () => {
                    await setFieldValue('answer', answer);
                    submitForm();
                  }}
                />
                {answer}
              </label>
            ))}
          </form>
        )}
      </Formik>
    </span>
  );
}

export default Page;
