import React from 'react';

import styled from 'styled-components';

const Label = styled.label`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;

  span {
    display: ${({ displayOptions }) =>
      displayOptions.big && displayOptions.big};
    @media only screen and (min-width: 768px) {
      display:${({ displayOptions }) =>
        displayOptions.small && displayOptions.small};
  }
`;

export default ({
  children,
  onClick,
  handle = '',
  displayOptions = { big: '', small: '' },
}) => (
  <Label displayOptions={displayOptions} onClick={onClick}>
    {children}
    <span>{handle}</span>
  </Label>
);
