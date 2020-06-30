import styled from 'styled-components';

const A = styled.a`
  letter-spacing: 3px;
  margin-top: 0;
  text-transform: uppercase;
  white-space: pre-line;
  cursor: pointer;
  :hover {
    border-bottom: 2px solid black;
  }
`;

export default ({ children, onClick }) => <A onClick={onClick}>{children}</A>;
