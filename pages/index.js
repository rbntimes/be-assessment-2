import React from 'react';
import useSWR from 'swr';
import Endless from '../components/Endless';
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

  return <List users={data.results} />;
}

export default Home;
