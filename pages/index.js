import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../lib/hooks';
import Endless from '../components/Endless';
import List from '../components/List';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { applySession } from 'next-session';
import fetcher from '../lib/fetch';
import { getUser } from '../lib/db';
import queryString from 'query-string';

function Home() {
  // const [user] = useCurrentUser();
  const { data, error } = useSWR('/api/list', fetcher);

  if (error) {
    return <span>Error</span>;
  }

  if (!data) {
    return <Endless />;
  }

  return <List users={data} />;
}

// export async function getServerSideProps({ req, res }) {
//   const { data } = fetch('http://localhost:3000/api/user');
//
//   console.log(data);
//   // const user = await getUser.json();
//   // if (user) {
//   //   console.log(user);
//   // }
//   // if (!user) context.res.statusCode = 404;
//   // const res = await fetch(`http://localhost:3000/api/list`, {
//   //   mode: 'cors', // no-cors, *cors, same-origin
//   //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   //   credentials: 'same-origin', // include, *same-origin, omit
//   // });
//   // const data = await res.json();
//   // console.log(data);
//   return { props: {} };
// }

export default Home;
