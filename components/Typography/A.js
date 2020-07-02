import React from 'react';

import styled from 'styled-components';

const A = styled.a`
  letter-spacing: 3px;
  margin-top: 0;
  text-transform: uppercase;
  white-space: pre-line;
  cursor: pointer;
`;

export default ({ children, onClick }) => <A onClick={onClick}>{children}</A>;
