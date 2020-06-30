import styled from 'styled-components';

const H5 = styled.h5`
  letter-spacing: 3px;
  margin-top: 0;
  text-transform: uppercase;
`;

export default ({ children }) => <H5>{children}</H5>;
