import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #0000ff;
  background-image: none;
  position: relative;
  display: flex;
  width: 100%;
  height: 3em;
  padding: 0 1em;
  line-height: 3;
  overflow: hidden;
  border-radius: 0.25em;
  color: white;

  @media (prefers-color-scheme: dark) {
    color: black;
    background: pink;
  }
`;

function SelectRender(props) {
  const { children } = props;
  return <Select {...props}>{children}</Select>;
}

export default SelectRender;
