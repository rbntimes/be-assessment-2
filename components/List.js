import React from 'react';
import styled from 'styled-components';
import { H3 } from './Typography';

const Ul = styled.ul`
  list-item-style: none
  margin: 0;
  padding: 0;
  ;
`;

const Item = styled.li`
  display: flex;
  margin: 0.5rem 0;
  padding: 0;
  align-items: center;
`;

const Picture = styled.img`
  width: 100px;
  margin-right: 1rem;
`;

const A = styled.a`
  text-decoration: none;
`;

function List({ users }) {
  return (
    <Ul>
      {users.map((user) => (
        <A href={`/user/${user._id}`}>
          <Item>
            <Picture src={user.picture} />
            <H3>
              {user.name}, {user.age}
            </H3>
          </Item>
        </A>
      ))}
    </Ul>
  );
}

export default List;
