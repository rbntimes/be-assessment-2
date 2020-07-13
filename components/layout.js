import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import styled from 'styled-components';
import { A } from './Typography';

const Container = styled.div`
  display: grid;
  grid-template-rows: 40px auto;
  grid-template-columns: 1fr 4fr 1fr;
  min-height: 98vh;
  @media (max-width: 768px) {
    grid-template-columns: 1rem 1fr 1rem;
  }
`;

const Content = styled.div`
  grid-row: 2 / 3;
  height: 100%;
  grid-column: 2 / 3;
  min-height: calc(100vh - 110px);
`;

const Nav = styled.nav`
  grid-column: 1 / 4;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  margin: 1rem;
`;

const Layout = ({ user, children }) => (
  <Container>
    <Nav>
      {user ? (
        <>
          <Link href="/">
            <A>Matches</A>
          </Link>
          <Link href="/question">
            <A>Questions</A>
          </Link>
          <Link href={`/user/${user?._id}`}>
            <A>Profile</A>
          </Link>
          <Link href={`/styleguide`}>
            <A>Styleguide</A>
          </Link>
        </>
      ) : (
        <Link href="/">
          <A>Endless</A>
        </Link>
      )}
    </Nav>

    <Content>{children}</Content>
  </Container>
);

export default Layout;
