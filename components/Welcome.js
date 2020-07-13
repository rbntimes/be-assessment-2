import React from 'react';
import styled from 'styled-components';
import { H1, P } from './Typography';
import Endless from './Endless';

const Page = styled.div``;

function Welcome() {
  return (
    <Page>
      <H1>Welcome</H1>
      <Endless />
      <P>
        Endless is a dating site that finds your perfect match according to your
        own custom preferences
      </P>
      <P>
        To find your perfect match, we&lsqoa;ll compare the answers you give on
        a large stack of questions against other users of Endless. Want to give
        it a try?
      </P>
      <P>
        <a href="/register">Sign up</a> / <a href="/login">log in</a> now!
      </P>
    </Page>
  );
}

export default Welcome;
