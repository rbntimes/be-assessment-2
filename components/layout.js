import Link from 'next/link';
import Nav from './Nav';
import fetch from 'isomorphic-unfetch';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: 40px auto 40px;
`;

const Content = styled.div`
  margin: 0 12px;
  grid-row: 2 / 3;
  height: 100%;
  min-height: calc(100vh - 110px);
`;

const Layout = ({ user, children }) => (
  <Container>
    <Nav user={user} />

    <Content>{children}</Content>
  </Container>
);

export default Layout;
