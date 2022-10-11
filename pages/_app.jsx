/* eslint-disable react/jsx-props-no-spreading */
// React
import React from 'react';
import { SSRProvider } from 'react-aria';

// Firebase
import { AuthUserProvider } from '../context/authUserContext';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </SSRProvider>
  );
}
