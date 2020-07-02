import React from 'react';

import styled from 'styled-components';

const H1 = styled.h1`
  letter-spacing: 3px;
  margin-top: 0;
  text-transform: uppercase;
`;

export default ({ children }) => <H1>{children}</H1>;
