import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  border-radius: 3px;
  text-decoration: none;
  background: #0000ff;
  color: white;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  margin-bottom: 3px;

  @media (prefers-color-scheme: dark) {
    color: black;
    background: pink;
  }
`;

function ButtonRender(props) {
  return <Button {...props}>{props.children}</Button>;
}

export default ButtonRender;
