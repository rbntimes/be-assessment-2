import React from 'react';

import styled from 'styled-components';
import useSWR from 'swr';
import { Formik } from 'formik';
import Endless from '../../components/Endless';
import { H1 } from '../../components/Typography';

import fetcher from '../../lib/fetch';

const Question = styled.div`
  display: flex;
  align-items: flex-end;
`;
const Answer = styled.button`
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

const Answers = styled.div`
  width: 100%;
  height: 100%;
  align-self: baseline;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Form = styled.form`
  display: grid;
  height: 100%;
`;

function Page() {
  const { data, mutate } = useSWR('/api/question', fetcher);

  if (!data || !(typeof data === 'object')) {
    return <Endless />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        questionId: data._id,
        question: data.question,
        answer: undefined,
      }}
      onSubmit={async (values) => {
        const response = await fetch('/api/question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.status === 201) {
          mutate('/api/question');
        }
        return response.json();
      }}
    >
      {({ values, handleSubmit, setFieldValue, submitForm }) => (
        <Form onSubmit={handleSubmit}>
          <Question>
            <H1>{data.question}</H1>
          </Question>
          <Answers>
            {data.answers.map((answer) => (
              <Answer
                type="radio"
                name="answer"
                value={answer}
                checked={values.answer === answer}
                onChange={async () => {
                  await setFieldValue('answer', answer);
                  submitForm();
                }}
              >
                {answer}
              </Answer>
            ))}
          </Answers>
        </Form>
      )}
    </Formik>
  );
}

export default Page;
