import React from 'react';
import styled from 'styled-components';
import { H1 } from './Typography';

const Profile = styled.div``;
const Bio = styled.p``;

const Picture = styled.img`
  width: 100%;
  margin: 1rem 0;
`;

function User({ user }) {
  return (
    <Profile>
      <Picture
        alt="profile"
        src={`https://randomuser.me/api/portraits/${
          user.gender === 'femal' ? 'women' : 'men'
        }/${user.age}.jpg`}
      />
      <H1>
        {user.name},{user.age}
      </H1>
      <Bio>
        I’m the kinda guy you can take home to meet your mom. She’ll think I’m
        super funny, and charming… and cute, but actually kind of sexy at the
        same time? She falls in love with me. I… think I feel the same way. We
        get married. I’m your dad now. I confront you, “young lady why are you
        on Tinder?” You’re now grounded.
      </Bio>
    </Profile>
  );
}

export default User;
