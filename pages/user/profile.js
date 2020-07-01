import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { applySession } from 'next-session';
import queryString from 'query-string';
import { useCurrentUser } from '../../lib/hooks';
import Endless from '../../components/Endless';
import User from '../../components/User';
import Profile from '../../components/Profile';
import List from '../../components/List';
import fetcher from '../../lib/fetch';
import { getUser } from '../../lib/db';
import middleware from '../../middlewares/middleware';

function UserProfile({ user }) {
  const [loggedinUser] = useCurrentUser();

  if (!user) {
    return <Endless />;
  }

  if (loggedinUser._id === user._id) {
    return <Profile user={user} />;
  }

  return <User user={user} />;
}

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res);
  const res = await fetch(
    `http://localhost:3000/api/user/${context.params.user}`
  );

  const user = await res.json();

  return { props: { user } };
}

export default UserProfile;
