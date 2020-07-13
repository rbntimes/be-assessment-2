import React from 'react';

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import useSWR from 'swr';
import { useCurrentUser } from '../lib/hooks';
import Layout from '../components/layout';
import fetcher from '../lib/fetch';

const theme = {
  colors: {
    primary: {
      background: '#fffff2',
      grey: '#e3e3e3',
    },
    typography: {
      link: '#067df7',
      text: '#000000',
    },
  },
  darkmode: {
    primary: {
      background: '#282C34',
      grey: '#555555',
    },
    typography: {
      link: '#067df7',
      text: '#ffffff',
    },
  },
  shadows: {
    hover: '2px 2px 3px rgba(0,0,0,0.05)',
  },
};

const GlobalStyle = createGlobalStyle`
  html {
    background: ${theme.colors.primary.background};
    color: ${theme.colors.typography.text};

    @media (prefers-color-scheme: dark) {
      background: ${theme.darkmode.primary.background};
      color: ${theme.darkmode.typography.text};
    }

    a:-webkit-any-link {
      color: inherit
    }
  }

  body {
    margin: 0;
    font: 11px -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
      Helvetica, sans-serif;
  }
`;

export default function MyApp({ Component, pageProps }) {
  const { data, error } = useSWR('/api/user', fetcher, {
    revalidateOnMount: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout user={data?.user}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
