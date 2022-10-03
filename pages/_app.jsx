/* eslint-disable react/jsx-props-no-spreading */
// React
import React from 'react';
import { SSRProvider } from 'react-aria';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
