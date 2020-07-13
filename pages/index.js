import React from 'react';
import useSWR from 'swr';
import Endless from '../components/Endless';
import Welcome from '../components/Welcome';
import List from '../components/List';
import fetcher from '../lib/fetch';

function Home() {
  const { data, error } = useSWR('/api/list', fetcher);
  if (error) {
    return <span>Error</span>;
  }

  if (!data) {
    return <Endless />;
  }

  if (!Object.keys(data).length) {
    return <Welcome />;
  }

  return <List users={data.results} />;
}

export default Home;
