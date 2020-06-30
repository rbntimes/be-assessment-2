import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../lib/hooks';
import Endless from '../../components/Endless';
import User from '../../components/User';
import List from '../../components/List';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { applySession } from 'next-session';
import fetcher from '../../lib/fetch';
import { getUser } from '../../lib/db';
import queryString from 'query-string';
import middleware from '../../middlewares/middleware';

function UserProfile({ user }) {
  if (!user) {
    return <Endless />;
  }
  // useEffect(() => {
  //   const [data] =
  //   fetch(`/api/list?${queryString.stringify(user)}`)
  //     .then((res) => res.json())
  //     .then((r) => console.log(r))
  // });

  return <User user={user} />;
}

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res);
  const res = await fetch(
    `http://localhost:3000/api/user/${context.params.user}`
  );

  const user = await res.json();

  if (user) {
    console.log(user, 'USER');
  }
  // if (!user) context.res.statusCode = 404;
  // const res = await fetch(`http://localhost:3000/api/list`, {
  //   mode: 'cors', // no-cors, *cors, same-origin
  //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: 'same-origin', // include, *same-origin, omit
  // });
  // const data = await res.json();
  // console.log(data);
  return { props: { user } };
}

export default UserProfile;
