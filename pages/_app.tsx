import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import SessionContext from '../contexts/SessionContext';
import { useEffect, useState } from 'react';
import { Session } from '../types';
import Image from 'next/image';
import { getSessionCookie } from '../utils/sessions';

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(() => {
    setSession(getSessionCookie());
  }, []);
  return (
    <>
      <SessionContext.Provider value={session}>
        <Navbar />
        <Component {...pageProps} />
        <footer className='footer'>
          <a
            href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Powered by{' '}
            <span className='logo'>
              <Image
                src='/vercel.svg'
                alt='Vercel Logo'
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </SessionContext.Provider>
    </>
  );
}

export default MyApp;
