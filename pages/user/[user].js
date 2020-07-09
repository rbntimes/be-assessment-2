import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useCurrentUser } from '../../lib/hooks';
import Endless from '../../components/Endless';
import User from '../../components/User';
import List from '../../components/List';
import fetcher from '../../lib/fetch';
import Profile from '../../components/Profile';

function UserProfile() {
  const [loggedinUser] = useCurrentUser();
  const router = useRouter();
  const { user } = router.query;
  const { data, error } = useSWR('/api/user/' + user, fetcher);

  if (!data || !loggedinUser) {
    return <Endless />;
  }

  if (loggedinUser?._id === data?.user._id) {
    return <Profile map={data.map} user={data.user} />;
  }

  return <User user={data.user} />;
}

export default UserProfile;
