import React from 'react';

import styled from 'styled-components';

const H4 = styled.h4`
  letter-spacing: 3px;
  margin-top: 0;
  text-transform: uppercase;
`;

export default ({ children }) => <H4>{children}</H4>;
