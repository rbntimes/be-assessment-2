import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  position: relative;
  display: flex;
  width: 92%;
  height: 3em;
  margin: 0;
  line-height: 3;
  padding: 0 1em;
  background: #0000ff;
  color: white;
  border-radius: 0.25em;

  @media (prefers-color-scheme: dark) {
    color: black;
    background: pink;
  }
`;

function InputRender(props) {
  const { children } = props;
  return <Input {...props}>{children}</Input>;
}

export default InputRender;
