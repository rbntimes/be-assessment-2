import React from 'react';
import styled from 'styled-components';

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

function ButtonRender() {
  return <Button type="submit">Submit</Button>;
}

export default ButtonRender;
