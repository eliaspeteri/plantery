import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import SessionContext from '../contexts/SessionContext';
import { useState } from 'react';
import { Session } from '../types';
import Image from 'next/image';

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session>({
    id: '',
    user: {
      id: '',
      name: 'Default User',
      email: '',
      plants: [
        {
          id: 'prayer-plant',
          name: 'Prayer plant',
          scientificName: 'Maranta leuconeura',
          createdAt: '2022-08-30',
          cultivation: {
            temperature: {
              min: 16,
              max: 27
            },
            water: {
              timesPerMonth: 4
            },
            fertilizer: {
              timesPerMonth: 4
            }
          }
        },
        {
          id: 'peacock-plant',
          name: 'Peacock plant',
          scientificName: 'Goeppertia makoyana',
          createdAt: '2022-08-30',
          lastWatered: new Date(2022, 7, 24)
        },
        {
          id: 'adansons-monstera',
          name: "Adanson's monstera",
          scientificName: 'Monstera adansonii',
          createdAt: '2022-08-30'
        },
        {
          id: 'dragon-tree',
          name: 'Dragon tree',
          scientificName: 'Dracaena marginata',
          createdAt: '2022-08-30'
        },
        {
          id: 'watermelon-dischidia',
          name: 'Watermelon Dischidia',
          scientificName: 'Dischidia Ovata',
          createdAt: '2022-08-30'
        }
      ],
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
