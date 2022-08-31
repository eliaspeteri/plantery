import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import SessionContext from '../contexts/SessionContext';
import { useState } from 'react';
import { Session } from '../types';

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session>({
    user: {
      id: '',
      name: '',
      email: '',
      plants: [],
      lastLoggedIn: new Date()
    },
    ttl: new Date(),
    token: ''
  });
  return (
    <>
      <SessionContext.Provider value={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionContext.Provider>
    </>
  );
}

export default MyApp;
