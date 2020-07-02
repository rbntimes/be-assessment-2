import React from 'react';

import styled from 'styled-components';

const H2 = styled.h2`
  letter-spacing: 3px;
  margin-top: 0;
  text-transform: uppercase;
`;

export default ({ children }) => <H2>{children}</H2>;
